import React, { useState } from "react";
import "./styles.scss";
import { useComments } from "./hooks";
import EditIcon from "../../icons/edit-icon/EditIcon";
import CommentsIcon from "../../icons/comment-icon/CommentIcon";
import DeleteIcon from "../../icons/delete-icon/DeleteIcon";
import CommentsTextbox from "../comment-textbox/CommentsTextbox";
import CancelIcon from "../../icons/cancel-icon/CancelIcon";
import SaveIcon from "../../icons/save-icon/SaveIcon";
// import { CommentsList } from "../comment-list/CommentsList";
import ReplyIcon from "../../icons/reply-icon/ReplyIcon";

interface IComment {
  data: string;
  comments: any[];
  loggedInUserId: number;
  postId: any;
  commentId: number;
  parentComments: any[];
  showReplies?: any;
  editComment: any;
  deleteComment?: any;
  makeComment?: any;
}

const Comment = (props: IComment) => {
  const {
    commentText,
    replies,
    handleShowReplies,
    isRepliesOpen,
    handleAddComment,
    handleEditReply,
    commentToEdit,
    setEditCommentText,
    editCommentText,
    handleSaveReply,
    handleEditText,
    handleDeleteComment,
    openEditReply,
    handleOpenReplyTextbox,
  } = useComments(props);

  return (
    <div>
      {
        <div className="comment__box">
          {!openEditReply ? (
            <>
              <div className="comment__text">{commentText}</div>
              <div className="comment__actions">
                <div onClick={() => handleOpenReplyTextbox()}>
                  <ReplyIcon />
                </div>
                <div onClick={() => handleShowReplies()}>
                  <CommentsIcon />
                </div>
                <div onClick={() => handleEditReply()}>
                  <EditIcon />
                </div>
                <div onClick={() => handleDeleteComment()}>
                  <DeleteIcon />
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
                      // setCommentData={props.setCommentData}
                      loggedInUserId={props.loggedInUserId}
                      handleAddComment={props.makeComment}
                      makeComment={props.makeComment}
                      parentComments={props.parentComments}
                      postId={props.postId}
                    />
                  )}
                </div>
                {replies.map((comment: any, i: number) => {
                  return (
                    <Comment
                      key={i}
                      data={comment.value}
                      comments={[...comment.comments]}
                      showReplies={props.showReplies}
                      editComment={props.editComment}
                      deleteComment={props.deleteComment}
                      makeComment={props.makeComment}
                      loggedInUserId={props.loggedInUserId}
                      postId={props.postId}
                      commentId={comment.id}
                      parentComments={[...props.parentComments, comment.id]}
                    />
                  );
                })}
                {/* <CommentsList
                  commentData={replies}
                  // setCommentData={setCommentsData}
                  // loggedInUserId={userId}
                  // parentComments={[]}
                  {...props}
                /> */}
              </div>
            }
          </div>
        </div>
      }
    </div>
  );
};

export default Comment;
