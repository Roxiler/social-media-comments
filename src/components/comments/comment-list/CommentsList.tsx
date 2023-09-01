import { useState } from "react"
import CommentsTextbox from "../comment-textbox/CommentsTextbox"
import Comment from "../comment/Comment"

interface ICommentList {
    commentData: any[]
    setCommentData: React.Dispatch<React.SetStateAction<any[]>>
}

export const CommentsList = (props: ICommentList) => {

    return (
        <div>
            <div>
                <CommentsTextbox setCommentData={props.setCommentData} />
                <div className="comments">
                    {
                        props.commentData.map((comment, i) => {
                            return <Comment key={i} data={comment.value} comments={comment.comments} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}