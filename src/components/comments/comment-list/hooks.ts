import { useEffect, useState } from "react"


export const useCommentsList = (props: any) => {

    const [comments, setComments]: any = useState(props.commentData);

    useEffect(() => {
        console.log("COMMENTS: ", props.commentData)
        setComments(props.commentData)
    }, []);

    const handleAddComment = (comment: any) => {
        console.log("INSIDE COMMENTS LIST: ", comment);
        // setComments(comment, ...comments);
        setComments([comment, ...comments]);
      }

    return {
        comments,
        handleAddComment
    }
}