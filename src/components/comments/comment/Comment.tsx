import React from "react";
import "./styles.scss";
import { useComments } from "./hooks";
import EditIcon from "../../icons/edit-icon/EditIcon";
import CommentsIcon from "../../icons/comment-icon/CommentIcon";
import DeleteIcon from "../../icons/delete-icon/DeleteIcon";
import CommentsTextbox from "../comment-textbox/CommentsTextbox";
import CancelIcon from "../../icons/cancel-icon/CancelIcon";
import SaveIcon from "../../icons/save-icon/SaveIcon";
import ReplyIcon from "../../icons/reply-icon/ReplyIcon";
import {postedDate }from "../postedTime/postedtime"

interface IComment {
  id: string;
  commentor: string;
  actions: Array<"EDIT" | "DELETE"> | [];
  value: string;
  totalComments: number;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  postId: string;
}

interface ICommentProps {
  data: IComment;
  postId: string;
  parentComments: string[];
  onShowReplies: Function;
  onEditComment: Function;
  onDeleteComment: Function;
  onAddComment: Function;
}

const Comment: React.FC<ICommentProps> = ({ parentComments, data, ...props }) => {
  const {
    user,
    commentText,
    replies,
    handleShowReplies,
    isRepliesOpen,
    handleEditReply,
    setEditCommentText,
    editCommentText,
    handleSaveReply,
    handleEditText,
    handleDeleteComment,
    openEditReply,
    handleOpenReplyTextbox,
    actions,
    totalComments
  } = useComments(parentComments, data, props);

  return (
    <div>
      {
        <div className="comment__box">
          {!openEditReply ? (
            <>
              <div className="commentorDetails" ><div className="commentor">{user} </div><div className="postedDate">{ postedDate(data?.createdAt)}</div></div>
              <div className="comment__text">{commentText}</div>
              <div className="comment__actions">
                <div onClick={() => handleOpenReplyTextbox()}>
                  <ReplyIcon />
                </div>
               
                {actions.includes("EDIT") && (
                  <div onClick={() => handleEditReply()}>
                    <EditIcon />
                  </div>
                )}
                {actions.includes("DELETE") && (
                  <div onClick={() => handleDeleteComment()}>
                    <DeleteIcon />
                  </div>
                )}
              </div>
              <div className="replies__count" >
              <div className="showReplies" onClick={() => handleShowReplies()}>
                  {/* <CommentsIcon /> */} {totalComments?<><div>____</div><div>view {totalComments} reply</div></>:null} 
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => handleEditText(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.code !== "Enter") return;
                    setEditCommentText(editCommentText);
                  }}
                />
              </div>
              <div className="comment__actions">
                <div onClick={() => handleSaveReply()}>
                  <SaveIcon />
                </div>
                <div onClick={() => handleEditReply()}>
                  <CancelIcon />
                </div>
              </div>
            </>
          )}

          <div className="comment__replies">
            {
              <div>
                <div>
                  {isRepliesOpen && (
                    <CommentsTextbox
                      onAddComment={props.onAddComment}
                      parentComments={parentComments}
                      postId={props.postId}
                      type="Reply"
                    />
                  )}
                </div>
                {replies.map((comment: any, i: number) => {
                  return (
                    <Comment
                      key={`${Math.random().toFixed(5).toString()}-${i}`}
                      data={comment}
                      parentComments={[...parentComments, comment.id]}
                      {...props}
                    />
                  );
                })}
              </div>
            }
          </div>
        </div>
      }
    </div>
  );
};

export default Comment;
