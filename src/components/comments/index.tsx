import React, { useEffect, useState } from "react";
// import { CommentsList } from "./comment-list/CommentsList";
import CommentsTextbox from "./comment-textbox/CommentsTextbox";
import Comment from "./comment/Comment";

interface Props {
  comments: any[];
  loggedInUserId: any;
  postId: any;
  showReplies: any;
  editComment: any;
  deleteComment: any;
  makeComment: any;
}

export const Comments: React.FC<Props> = ({ comments, loggedInUserId, ...props }) => {
  const [commentsData, setCommentsData]: any = useState(comments);

  return (
    <div>
      <CommentsTextbox
        loggedInUserId={loggedInUserId}
        handleAddComment={props.makeComment}
        makeComment={props.makeComment}
        parentComments={[]}
        postId={props.postId}
      />
      <div>
        <div className="comments">
          {commentsData.length > 0 &&
            commentsData.map((comment: any, i: number) => {
              console.log("Current comment: ", comment);
              return (
                // <>
                <Comment
                  key={`${Math.random().toFixed(5).toString()}-${i}`} // comment id to be used
                  data={comment.value} // pass the entire comment itself and remove comment id prop
                  comments={[...comment.comments]}
                  loggedInUserId={loggedInUserId}
                  commentId={comment.id}
                  parentComments={[comment.id]}
                  {...props}
                />
                // </>
              );
            })}
        </div>
      </div>
    </div>
  );
};
