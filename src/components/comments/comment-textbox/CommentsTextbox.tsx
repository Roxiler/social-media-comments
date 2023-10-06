import React, { useState } from "react";
import "./styles.scss";
import { useCommentTextbox } from "./hooks";
interface ICommentInputProps {
  makeComment: any;
  loggedInUserId: number;
  handleAddComment: any;
  parentComments: any;
  postId: any;
}

const CommentsTextbox: React.FC<ICommentInputProps> = (props) => {
  const [comment, setComment] = useState("");

  const { handleSubmitComment } = useCommentTextbox(props);

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => {
          console.log("Making comment from comment textbox");
          // handleSubmitComment(comment, loggedInUserId, makeComment, handleAddComment);
          handleSubmitComment(comment);
          setComment("");
        }}
      >
        Post
      </button>
    </div>
  );
};

export default CommentsTextbox;
