import { useEffect, useState } from "react";

export const useComments = (parentComments: any, data: any, props: any) => {
  const [user,setUser]=useState('')
  const [commentText, setCommentText] = useState('');
  const [replies, setReplies]: any = useState([]);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [openEditReply, setOpenEditReply] = useState(false);
  const [editCommentText, setEditCommentText] = useState('');
  const [actions, setActions]: any = useState([]);

  useEffect(() => {
    setUser(data.commentor)
    setCommentText(data.value);
    setReplies(data.comments);
    setActions(data.actions);
    setEditCommentText(data.value)
  }, [])

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
    user,
    commentText,
    replies,
    handleShowReplies,
    isRepliesOpen,
    handleEditReply,
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
