import React, { useEffect, useState } from "react";
import { Comments } from ".";
import "./styles.scss";
import {
  createComment,
  onDeleteComment,
  getCommentsOnPost,
  getRepliesOnComments,
  updateComment,
} from "./services/comments";

const initialComments = [
  {
    id: "5654c533-5c94-478d-9725-17dbf8dea2f8",
    commentor: "Kyle",
    actions: ['EDIT', 'DELETE'],
    value: "I am a root comment",
    totalComments: 2,
    comments: [],
    createdAt: '2023-10-04T05:22:29.437Z',
    updatedAt: '2023-10-04T05:22:29.437Z',
    postId: 'b5733ece-23a5-43ed-9c8e-6d2a7e11f31e'
  },
  {
    id: "d31cd2e3-42f6-4da0-8971-abbff3f726f2",
    commentor: "Sally",
    actions: ['DELETE'],
    value: "I am another root comment",
    totalComments: 2,
    comments: [],
    createdAt: '2023-09-25T05:59:05.100Z',
    updatedAt: '2023-09-25T05:59:05.100Z',
    postId: 'b5733ece-23a5-43ed-9c8e-6d2a7e11f31e'
  },
];

const App = () => {
  const [commentsList, setCommentsList]: any = useState(initialComments);

  useEffect(() => {
    getCommentsOnPost("b5733ece-23a5-43ed-9c8e-6d2a7e11f31e");
  }, [])

  const handleShowReplies = async (comment: any, parentComments: any) => {
    const response = await getRepliesOnComments(comment.id);
    const responseCommentsList = response.map((comment: any) => {
      const combos = [['EDIT', 'DELETE'], ['DELETE'], []];
      const num = Math.floor(Math.random() * 3);
      return {
        id: comment.id,
        commentor: "John Doe",
        value: comment.message,
        totalComments: comment.children.length,
        comments: [],
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        postId: comment.postId,
        actions: combos[num]
      };
    });

    const getArrayData = (comments: any, i: any) => {
      if (i >= parentComments.length) {
        return responseCommentsList;
      }

      comments.forEach((comment: any) => {
        if (comment.id === parentComments[i]) {
          comment.comments = getArrayData(comment.comments, i + 1);
        }
      });

      return comments;
    };

    const newArr = getArrayData(commentsList, 0);
    setCommentsList([...newArr]);

    return responseCommentsList;
  };

  const handleDeleteComment = async (
    // postId: any,
    comment: any,
    parentId: any,
    parentComments: any
  ) => {
    await onDeleteComment({
      postId: comment.postId,
      id: comment.id,
    });

    const getArrayData = (comments: any, i: any) => {
      if (i === parentComments.length) {
        const newCommentsArray = comments.filter((c: any) => {
          if (c.id !== comment.id) {
            return c;
          }
        });
        return newCommentsArray;
      }

      comments.forEach((comment: any) => {
        if (comment.id === parentComments[i]) {
          comment.comments = getArrayData(comment.comments, i + 1);
        }
      });

      return comments;
    };

    const newArr = getArrayData(commentsList, 0);
    setCommentsList([...newArr]);
  };

  const handleEditComment = async (
    comment: any,
    text: string,
    parentComments: any
  ) => {
    const response: any = await updateComment({
      postId: comment.postId,
      message: text,
      id: comment.id,
    });

    const getArrayData = (comments: any, i: any) => {
      if (i === parentComments.length) {
        const newCommentsArray = comments.map((c: any) => {
          if (c.id === comment.id) {
            c.value = response.message;
            // return c;
          }
          return c;
        });
        return newCommentsArray;
      }

      comments.forEach((comment: any) => {
        if (comment.id === parentComments[i]) {
          comment.comments = getArrayData(comment.comments, i + 1);
        }
      });

      return comments;
    };

    const newArr = getArrayData(commentsList, 0);
    setCommentsList([...newArr]);
  };

  const handleAddComment = async (
    postId: string,
    parentId: any,
    text: string,
    parentComments: any
  ) => {
    const response: any = await createComment({
      postId: postId,
      message: text,
      parentId: parentId,
    });

    const combos = [['EDIT', 'DELETE'], ['DELETE'], []];
    const num = Math.floor(Math.random() * 3);

    const newComment = {
      id: response.id,
      commentor: response.user.name,
      value: response.message,
      totalComments: 0,
      comments: [],
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      postId: response.postId,
      actions: combos[num]
    };

    const getArrayData = (comments: any, i: any) => {
      if (i == parentComments.length) {
        const newCommentsArray = [newComment, ...comments];
        return newCommentsArray;
      }

      comments.forEach((comment: any) => {
        if (comment.id === parentComments[i]) {
          comment.comments = getArrayData(comment.comments, i + 1);
        }
      });

      return comments;
    };

    const newArr = getArrayData(commentsList, 0);
    setCommentsList([...newArr]);
  };

  return (
    <>
      <div className="comment-wrapper">
        {commentsList.length > 0 && (
          <Comments
            comments={commentsList}
            postId={"b5733ece-23a5-43ed-9c8e-6d2a7e11f31e"}
            onShowReplies={handleShowReplies}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </>
  );
}

export default App;
