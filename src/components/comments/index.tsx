import { useEffect, useState } from "react";
import { CommentsList } from "./comment-list/CommentsList";


interface Props {
    comments: any[];
    loggedInUserId: any;
    postId: any;
    showReplies?: any;
    editComment: any;
    deleteComment?: any;
    makeComment?: any;
}

export const Comments = ({comments, loggedInUserId, ...props}: any) => {
    // const { comments, userId } = props;
    const [commentsData, setCommentsData]: any = useState(comments)

    // useEffect(() => {
    //     console.log("POSTS IN: ", props.comments);
    //     setCommentsData([...comments]);
    // }, [])

    return (
        <div>
            <CommentsList 
                comments={commentsData} 
                // setCommentData={setCommentsData}
                loggedInUserId={loggedInUserId}
                parentComments={[]}
                {...props}
            />
        </div>
    )
}