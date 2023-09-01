export const useCommentTextbox = () => {
  const handleSubmitComment = async (
    comment: string,
    userId: number,
    makeComment: any,
    handleAddComment: any
  ) => {
    const data = await makeComment(comment, userId);
    console.log("INSIDE CUSTOM HOOK OF COMMENT TEXTBOX")
    const response = {
      id: 11,
      userName: "AAAA",
      value: "New comment added",
      comments: [
        {
          id: 22,
          userName: "XYZ",
          value: "all good",
          comments: [
            {
              id: 33,
              userName: "ABC",
              value: "how's your day",
              comments: [],
            },
          ],
        },
      ],
    };

    handleAddComment(response);
  };

  return {
    handleSubmitComment,
  };
};
