import { useState } from "react";

export const useCommentTextbox = (props: any) => {

  const [comment, setComment] = useState("");

  const handleSubmitComment = async (comment: string) => {
    const newParentComments = [...props.parentComments];
    const parentId = newParentComments[newParentComments.length - 1] || null;
    props.onAddComment(props.postId, parentId, comment, newParentComments);
  };

  return {
    handleSubmitComment,
    comment,
    setComment
  };
};
