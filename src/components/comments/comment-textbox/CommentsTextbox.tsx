import React, { useState } from 'react'
import "./styles.scss"
interface ICommentInputProps {
    setCommentData: React.Dispatch<React.SetStateAction<any[]>>
}


const CommentsTextbox = (props: ICommentInputProps) => {
    const [comment, addComment] = useState("")
    return (
        <div className="input-wrapper">
            <input
                type="text"
                placeholder='add comment...'
                value={comment}
                onChange={(e) => addComment(e.target.value)}
                onKeyUp={(e) => {
                    if (e.code !== "Enter") return
                    props.setCommentData(prev => [...prev, { value: comment, comments: [] }]);
                    addComment("")
                }}
            />
            <button onClick={() => {
                props.setCommentData(prev => [...prev, { value: comment, comments: [] }]);
                addComment("")
            }}>Post</button>
        </div>
    )
}

export default CommentsTextbox