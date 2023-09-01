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

interface IComment {
  data: string;
  comments: any[];
  showReplies?: any;
  editComment?: any;
  deleteComment?: any;
  makeComment?: any;
  loggedInUserId: number;
}

const Comment = (props: IComment) => {
  const { replies, handleShowReplies, isRepliesOpen, handleAddComment } =
    useComments();

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
        <div className="comment__text">{props.data}</div>
        <div className="comment__actions">
          <div onClick={() => handleShowReplies(props.showReplies, 1)}>
            <CommentsIcon />
          </div>
          <div>
            <EditIcon />
          </div>
          <div>
            <DeleteIcon />
          </div>
        </div>
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
