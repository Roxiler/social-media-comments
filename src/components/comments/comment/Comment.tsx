import React, { useState } from "react";
import "./styles.scss";
import Home from "../../icons/home-icon/HomeIcon";
import { useComments } from "./hooks";
import Edit from "../../icons/edit-icon/EditIcon";
import HomeIcon from "../../icons/home-icon/HomeIcon";
import EditIcon from "../../icons/edit-icon/EditIcon";
import CommentsIcon from "../../icons/comment-icon/CommentIcon";
import DeleteIcon from "../../icons/delete-icon/DeleteIcon";
import CommentsTextbox from "../comment-textbox/CommentsTextbox";
import CancelIcon from "../../icons/cancel-icon/CancelIcon";
import SaveIcon from "../../icons/save-icon/SaveIcon";

interface IComment {
  data: string;
  comments: any[];
  showReplies?: any;
  editComment: any;
  deleteComment?: any;
  makeComment?: any;
  loggedInUserId: number;
  commentId: number;
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
    handleEditText
  } = useComments(props);

  return (
    <div>
      <div className="comment__box">
        {/* <div className="comment">{props.data}</div> */}
        {/* <div className="nested_comment">
          {props.comments.map((comment, i) => {
            return (
              <Comment
                key={i}
                comments={comment.comments}
                data={comment.value}
              />
            );
          })}
        </div> */}
        {!commentToEdit ? (
          <>
            <div className="comment__text">{commentText}</div>
            <div className="comment__actions">
              <div onClick={() => handleShowReplies(props.showReplies, 1)}>
                <CommentsIcon />
              </div>
              <div onClick={() => handleEditReply(props.commentId)}>
                <EditIcon />
              </div>
              <div>
                <DeleteIcon />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="input-wrapper">
            <input
                type="text"
                // placeholder='add comment...'
                value={commentText}
                onChange={(e) => handleEditText(e.target.value)}
                onKeyUp={(e) => {
                    if (e.code !== "Enter") return
                    setEditCommentText(editCommentText);
                    // props.setCommentData(prev => [...prev, { value: comment, comments: [] }]);
                    // addComment("")
                }}
            />
        </div>
        <div className="comment__actions">
              <div onClick={() => handleSaveReply(commentToEdit)}>
                <SaveIcon />
              </div>
              <div onClick={() => handleEditReply(null)}>
                <CancelIcon />
              </div>
            </div>
          </>
        )}

        <div className="comment__replies">
          {isRepliesOpen && replies.length > 0 && (
            <div>
              <div>
                <CommentsTextbox
                  loggedInUserId={props.loggedInUserId}
                  handleAddComment={handleAddComment}
                  makeComment={props.makeComment}
                />
              </div>
              {replies.map((comment: any, i: number) => {
                return (
                  <Comment
                    key={i}
                    data={comment.value}
                    comments={comment.comments}
                    showReplies={props.showReplies}
                    editComment={props.editComment}
                    deleteComment={props.deleteComment}
                    makeComment={props.makeComment}
                    loggedInUserId={props.loggedInUserId}
                    commentId={comment.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
