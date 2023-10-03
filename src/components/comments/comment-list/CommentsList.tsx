import { useState } from "react";
import CommentsTextbox from "../comment-textbox/CommentsTextbox";
import Comment from "../comment/Comment";
import { useCommentsList } from "./hooks";

interface ICommentList {
  comments: any[];
  setCommentData?: React.Dispatch<React.SetStateAction<any[]>>;
  showReplies?: any;
  editComment: any;
  deleteComment?: any;
  makeComment?: any;
  loggedInUserId: number;
  postId: any;
  parentComments: any[];
}

export const CommentsList = ({loggedInUserId, parentComments, ...props}: any) => {
  const { comments, handleAddComment } = useCommentsList(props);

  return (
    <div>
      <div>
        <CommentsTextbox
          // setCommentData={props.setCommentData}
          loggedInUserId={props.loggedInUserId}
          handleAddComment={handleAddComment}
          makeComment={props.makeComment}
          parentComments={parentComments}
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
                    comments={[...comment.comments]}
                    loggedInUserId={loggedInUserId}
                    commentId={comment.id}
                    parentComments={[...parentComments, comment.id]}
                    showReplies={props.showReplies}
                    editComment={props.editComment}
                    deleteComment={props.deleteComment}
                    makeComment={props.makeComment}
                    postId={props.postId}
                  />
                // </>
              );
            })}
        </div>
      </div>
    </div>
  );
};
