export const useCommentTextbox = (props: any) => {
  const handleSubmitComment = async (comment: string) => {
    const newParentComments = [...props.parentComments];
    // newParentComments.pop();
    // console.log('PARENT COMMENTS: ', props.parentComments);
    // console.log('NEW PARENT COMMENTS: ', newParentComments);

    const parentId = newParentComments[newParentComments.length - 1] || null;

    props.makeComment(props.postId, parentId, comment, newParentComments);
  };

  return {
    handleSubmitComment,
  };
};
