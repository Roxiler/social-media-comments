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
import { CommentsList } from "../comment-list/CommentsList";

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
    openEditReply
  } = useComments(props);

  return (
    <div>
      {
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
        {!openEditReply ? (
          <>
            <div className="comment__text">{commentText}</div>
            <div className="comment__actions">
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
                // placeholder='add comment...'
                value={editCommentText}
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
              {/* <div>
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
                    comments={[...comment.comments]}
                    showReplies={props.showReplies}
                    editComment={props.editComment}
                    deleteComment={props.deleteComment}
                    makeComment={props.makeComment}
                    loggedInUserId={props.loggedInUserId}
                    commentId={comment.id}
                    parentComments={[...props.parentComments, comment.id]}
                  />
                );
              })} */}
              <CommentsList 
                commentData={replies} 
                // setCommentData={setCommentsData}
                // loggedInUserId={userId}
                // parentComments={[]}
                {...props}
            />
            </div>
          }
        </div>
      </div>}
    </div>
  );
};

export default Comment;
