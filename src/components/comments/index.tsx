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
            <CommentsList commentData={commentsData} setCommentData={setCommentsData} />
        </div>
    )
}