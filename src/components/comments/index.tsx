import { useState } from "react";
import { CommentsList } from "./comment-list/CommentsList";


interface Props {
    comments: any[];
    userId: number;
}

export const Comments = (props: Props) => {
    const { comments, userId } = props;
    const [commentsData, setCommentsData] = useState(comments)

    return (
        <div>
            <CommentsList 
                commentData={commentsData} 
                setCommentData={setCommentsData}
                showCommentReplies={() => console.log("Function to handle show replies on the comment")}
                editComment={() => console.log("Edit the current comment")}
                deleteComment={() => console.log("Delete the current comment")}
                makeComment={() => console.log("Making a comment")}
                loggedInUserId={userId}
            />
        </div>
    )
}