import { useEffect, useState } from "react"


export const useComments = (props: any) => {

    const [commentText, setCommentText] = useState("")
    const [replies, setReplies]: any = useState([]);
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);
    const [openEditReply, setOpenEditReply] = useState(false);
    const [commentToEdit, setCommentToEdit]: any = useState();
    const [editCommentText, setEditCommentText] = useState("");

    useEffect(() => {
      setCommentText(props.data);
    }, [])

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

    const handleAddComment = (comment: any) => {
      setReplies([comment, ...replies]);
    }

    const handleEditReply = (id: number | null) => {
      setOpenEditReply(!openEditReply);
      setCommentToEdit(id);
      if(!id) {
        setCommentText(props.data);
      }
    }

    const handleSaveReply = (id: number) => {
      props.editComment(id);
      setCommentText(editCommentText);
      setOpenEditReply(!openEditReply);
      setCommentToEdit(null);
    }

    const handleEditText = (text: string) => {
      console.log('TEXT: ', text);
      setEditCommentText(text);
      setCommentText(text);
    }

    return {
      commentText,
        replies,
        handleShowReplies,
        isRepliesOpen,
        handleAddComment,
        handleEditReply,
        commentToEdit,
        setEditCommentText,
        editCommentText,
        handleSaveReply,
        handleEditText
    }
};