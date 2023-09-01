import React from 'react'
import "./styles.scss"

interface IComment {
    data: string
    comments: any[]
}


const Comment = (props: IComment) => {
    return (
        <div>
            <div className='comment-box'>
                <div className="comment">
                    {props.data}
                </div>
                <div className="nested_comment">
                    {
                        props.comments.map((comment, i) => {
                            return <Comment key={i} comments={comment.comments} data={comment.value} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment