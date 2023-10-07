import { useEffect, useState } from "react";

export const useComments = (parentComments: any, data: any, props: any) => {
  const [commentText, setCommentText] = useState(data.value);
  const [replies, setReplies]: any = useState(data.comments);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [openEditReply, setOpenEditReply] = useState(false);
  const [commentToEdit, setCommentToEdit]: any = useState();
  const [editCommentText, setEditCommentText] = useState(data.value);
  const [actions, setActions]: any = useState(data.actions);

  const handleShowReplies = async () => {
    await props.onShowReplies(data, parentComments);
  };

  const handleOpenReplyTextbox = () => {
    setIsRepliesOpen(!isRepliesOpen);
  };

  const handleEditReply = () => {
    setOpenEditReply(!openEditReply);
  };

  const handleSaveReply = async () => {
    const newParentComments = [...parentComments];
    newParentComments.pop();
    await props.onEditComment(data, editCommentText, newParentComments);
    setOpenEditReply(!openEditReply);
  };

  const handleEditText = (text: string) => {
    setEditCommentText(text);
  };

  const handleDeleteComment = async () => {
    const newParentComments = [...parentComments];
    newParentComments.pop();
    const parentId = newParentComments[newParentComments.length - 1] || null;
    await props.onDeleteComment(data, parentId, newParentComments);
  };

  return {
    commentText,
    replies,
    handleShowReplies,
    isRepliesOpen,
    handleEditReply,
    commentToEdit,
    setEditCommentText,
    editCommentText,
    handleSaveReply,
    handleEditText,
    handleDeleteComment,
    openEditReply,
    handleOpenReplyTextbox,
    actions,
  };
};
