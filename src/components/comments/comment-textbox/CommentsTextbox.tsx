import React from "react";
import "./styles.scss";
import { useCommentTextbox } from "./hooks";
interface ICommentInputProps {
  onAddComment: Function;
  parentComments: string[];
  postId: string;
}

const CommentsTextbox: React.FC<ICommentInputProps> = (props) => {

  const { comment, setComment, handleSubmitComment } = useCommentTextbox(props);

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        autoFocus
      />
      <button
        onClick={() => {
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
