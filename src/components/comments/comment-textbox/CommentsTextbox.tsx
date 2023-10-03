import React, { useState } from 'react'
import "./styles.scss"
import { useCommentTextbox } from './hooks'
interface ICommentInputProps {
    // setCommentData?: React.Dispatch<React.SetStateAction<any[]>>
    makeComment: any
    loggedInUserId: number
    handleAddComment: any
    parentComments: any
}


const CommentsTextbox = (props: ICommentInputProps) => {
    const [comment, addComment] = useState("")
    const {makeComment, loggedInUserId, handleAddComment} = props;

    const {
        handleSubmitComment
    } = useCommentTextbox()
    return (
        <div className="input-wrapper">
            <input
                type="text"
                placeholder='add comment...'
                value={comment}
                onChange={(e) => addComment(e.target.value)}
                // onKeyUp={(e) => {
                //     if (e.code !== "Enter") return
                //     props.setCommentData(prev => [...prev, { value: comment, comments: [] }]);
                //     addComment("")
                // }}
            />
            <button onClick={() => {
                // props.setCommentData(prev => [...prev, { value: comment, comments: [] }]);
                console.log("Making comment from comment textbox")
                // handleSubmitComment(comment, loggedInUserId, makeComment, handleAddComment);
                handleAddComment(comment, props.parentComments);
                addComment("")
            }}>Post</button>
        </div>
    )
}

export default CommentsTextbox