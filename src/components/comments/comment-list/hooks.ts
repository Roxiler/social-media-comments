import { useEffect, useState } from "react";

export const useCommentsList = (comments: any, props: any) => {
  const [commentsData, setCommentsData]: any = useState(comments);

  const handleAddComment = (comment: any, parentComments: any) => {
    const parentId = parentComments[parentComments.length - 1] || null;

    props.makeComment(props.postId, parentId, comment, parentComments);
  };

  return {
    commentsData,
    handleAddComment,
  };
};
