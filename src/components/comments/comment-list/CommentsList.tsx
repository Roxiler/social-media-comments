import React, {useState} from 'react'
import Comments from '../comment/Comment'
import CommentsTextbox from '../comment-textbox/CommentsTextbox'

const comments = [
    {
        id: 1,
        userName:"JP",
        value: "hello",
        items: [{
            id: 11,
            userName: "AAAA",
            value: "hi there",
            items: [
                {
                    id: 22,
                    userName: "XYZ",
                    value: "all good",
                    items: [
                        {
                            id: 33,
                            userName: "ABC",
                            value: "how's your day",
                            items: []
                        }
                    ]
                }
            ]
        },
        {
            id: 12,
            userName: "ZZ",
            value: "hi there",
            items: []
        },
        ]
    },
    {
        id: 2,
        userName: "BBBB",
        value: "test",
        items: [{
            id: 11,
            value: "test1",
            items: []
        },
        {
            id: 12,
            userName: "ZZ",
            value: "test1",
            items: [
                {
                    id: 22,
                    userName: "XYZ",
                    value: "test2",
                    items: [
                        {
                            id: 33,
                            userName: "ABC",
                            value: "test3",
                            items: []
                        }
                    ]
                }
            ]
        },
        ]
    }
]

export const CommentsList = (props: any) => {




    return (
        <div style={{width: 400, height: 100}}>
            {comments.map((ele)=>{
                return <Comments message={ele.value} username={ele.userName} createdAt='25 July '></Comments>
            })}
            <CommentsTextbox/>
        </div>
    )
}
