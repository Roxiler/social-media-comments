import React, { useEffect, useState } from "react";
import CommentsTextbox from "./comment-textbox/CommentsTextbox";
import Comment from "./comment/Comment";

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

interface IProps {
  comments: IComment[];
  postId: string;
  onShowReplies: Function;
  onEditComment: Function;
  onDeleteComment: Function;
  onAddComment: Function;
}

export const Comments: React.FC<IProps> = ({ comments, ...props }) => {
  const [commentsData, setCommentsData]: any = useState(comments);

  return (
    <div>
      <CommentsTextbox
        onAddComment={props.onAddComment}
        parentComments={[]}
        postId={props.postId}
      />
      <div>
        <div className="comments">
          {commentsData.length > 0 &&
            commentsData.map((comment: any, i: number) => {
              return (
                <Comment
                  key={`${Math.random().toFixed(5).toString()}-${i}`} // comment id to be used
                  data={comment}
                  parentComments={[comment.id]}
                  {...props}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
