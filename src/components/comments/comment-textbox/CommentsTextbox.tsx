import React from "react";
import "./styles.scss";
import { useCommentTextbox } from "./hooks";
interface ICommentInputProps {
  onAddComment: Function;
  parentComments: string[];
  postId: string;
  type: "Reply" | "Post"
}

const CommentsTextbox: React.FC<ICommentInputProps> = (props) => {

  const { comment, setComment, handleSubmitComment } = useCommentTextbox(props);

  return (
    <div className={`input-wrapper ${props.type === "Reply" ? 'nested-input-wapper' : ''}`}>
      <input
        type="text"
        placeholder="Add Comment..."
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
        {props.type === "Reply" ? "Reply" : "Post"}
      </button>
    </div>
  );
};

export default CommentsTextbox;
