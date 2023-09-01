import { useState } from "react";
import CommentsTextbox from "../comment-textbox/CommentsTextbox";
import Comment from "../comment/Comment";
import { useCommentsList } from "./hooks";

interface ICommentList {
  commentData: any[];
  setCommentData: React.Dispatch<React.SetStateAction<any[]>>;
  showCommentReplies?: any;
  editComment?: any;
  deleteComment?: any;
  makeComment?: any;
  loggedInUserId: number;
}

export const CommentsList = (props: ICommentList) => {
  const { comments, handleAddComment } = useCommentsList(props);

  return (
    <div>
      <div>
        <CommentsTextbox
          setCommentData={props.setCommentData}
          loggedInUserId={props.loggedInUserId}
          handleAddComment={handleAddComment}
          makeComment={props.makeComment}
        />
        <div className="comments">
          {comments.length > 0 &&
            comments.map((comment: any, i: number) => {
              console.log("Current comment: ", comment)
              return (
                // <>
                  <Comment
                    key={`${Math.random().toFixed(5).toString()}-${i}`}
                    data={comment.value}
                    comments={comment.comments}
                    showReplies={props.showCommentReplies}
                    editComment={props.editComment}
                    deleteComment={props.deleteComment}
                    loggedInUserId={props.loggedInUserId}
                    makeComment={props.makeComment}
                  />
                // </>
              );
            })}
        </div>
      </div>
    </div>
  );
};
