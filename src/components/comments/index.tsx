import { useState } from "react";
import { CommentsList } from "./comment-list/CommentsList";


interface Props {
    comments: any[];
}

export const Comments = (props: Props) => {
    const { comments } = props;
    const [commentsData, setCommentsData] = useState(comments)

    return (
        <div>
            <CommentsList 
                commentData={commentsData} 
                setCommentData={setCommentsData}
                showCommentReplies={() => console.log("Function to handle show replies on the comment")}
                editComment={() => console.log("Edit the current comment")}
                deleteComment={() => console.log("Delete the current comment")}
            />
        </div>
    )
}