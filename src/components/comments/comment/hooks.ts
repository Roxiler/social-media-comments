import { useState } from "react"


export const useComments = () => {

    const [replies, setReplies]: any = useState([]);
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);

    const handleShowReplies = async (showReplies: any, commentId: number) => {
        setIsRepliesOpen(!isRepliesOpen);
        const data = await showReplies(commentId);
        console.log("DATA", data);
        setReplies([{
            id: 11,
            userName: "AAAA",
            value: "Comment Reply 1",
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
                    comments: []
                  }
                ]
              }
            ]
          },
          {
            id: 12,
            userName: "ZZ",
            value: "Comment Reply 2",
            comments: []
          },
          ]);
    }

    return {
        replies,
        handleShowReplies,
        isRepliesOpen
    }
};