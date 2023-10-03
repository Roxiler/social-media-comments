import { useEffect, useState } from "react"


export const useComments = (props: any) => {

    const [commentText, setCommentText] = useState(props.data)
    const [replies, setReplies]: any = useState(props.comments);
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);
    const [openEditReply, setOpenEditReply] = useState(false);
    const [commentToEdit, setCommentToEdit]: any = useState();
    const [editCommentText, setEditCommentText] = useState(props.data);

    // useEffect(() => {
    //   setCommentText(props.data);
    // }, [])

    const handleShowReplies = async () => {
        // setIsRepliesOpen(!isRepliesOpen);
        // console.log("COMMENT ID: ", commentId)
        const data = await props.showReplies(props.commentId, props.parentComments);
        console.log("DATA AFTER CALLING SHOW RESPONSE: \n", data);
        // setReplies(replies);
    }

    const handleAddComment = async (comment: any) => {
      setReplies([comment, ...replies]);
    }

    const handleEditReply = () => {
      setOpenEditReply(!openEditReply);
      // setCommentToEdit(id);
      // if(!id) {
      //   setCommentText(props.data);
      // }
    }

    const handleSaveReply = async () => {
      const newParentComments = [...props.parentComments];
      newParentComments.pop();
      const parentId = newParentComments[newParentComments.length - 1] || null;
      await props.editComment(props.postId, props.commentId, editCommentText, newParentComments);
      // setCommentText(editCommentText);
      setOpenEditReply(!openEditReply);
      // setCommentToEdit(null);
    }

    const handleEditText = (text: string) => {
      console.log('TEXT: ', text);
      setEditCommentText(text);
      // setCommentText(text);
    }

    const handleDeleteComment = async () => {
      const newParentComments = [...props.parentComments];
      newParentComments.pop();
      const parentId = newParentComments[newParentComments.length - 1] || null;
      await props.deleteComment(props.postId, props.commentId, parentId, newParentComments);
      // setCommentText("");
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
        handleEditText,
        handleDeleteComment,
        openEditReply
    }
};