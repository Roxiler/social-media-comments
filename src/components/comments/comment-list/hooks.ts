import { useEffect, useState } from "react"


export const useCommentsList = (props: any) => {

    const [comments, setComments]: any = useState(props.comments);
    console.log("COMMENTS PRISMA: ", comments);

    // useEffect(() => {
    //     console.log("COMMENTS: ", props.commentData)
    //     setComments([...props.commentData])
    // }, []);

    const handleAddComment = (comment: any, parentComments: any) => {
        console.log("INSIDE COMMENTS LIST: ", comment);
        // setComments(comment, ...comments);
        // setComments([comment, ...comments]);
        const parentId = parentComments[parentComments.length - 1] || null;
        
      props.makeComment(props.postId, parentId, comment, parentComments);
      }

    return {
        comments,
        handleAddComment
    }
}