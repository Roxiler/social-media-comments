import { useEffect, useState } from "react";
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
    id: "14d3479f-61df-4f87-bf24-065dbd5f87f0",
    commentor: "Kyle",
    actions: ['EDIT', 'DELETE'],
    value: "I am a root comment",
    totalComments: 2,
    comments: [],
    createdAt: '2023-10-04T05:22:29.437Z',
    updatedAt: '2023-10-04T05:22:29.437Z',
    postId: '15499a21-ac4c-4075-ab39-f1c9e8c70719'
  },
  {
    id: "836911b1-ed36-4807-a776-51c96bdc20a2",
    commentor: "Sally",
    actions: ['DELETE'],
    value: "I am another root comment",
    totalComments: 2,
    comments: [],
    createdAt: '2023-09-25T05:59:05.100Z',
    updatedAt: '2023-09-25T05:59:05.100Z',
    postId: '15499a21-ac4c-4075-ab39-f1c9e8c70719'
  },
];

const App = () => {
  const [commentsList, setCommentsList]: any = useState(initialComments);

  useEffect(() => {
    getCommentsOnPost("15499a21-ac4c-4075-ab39-f1c9e8c70719");
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
    let str: string = "";
    for (let s of parentComments) {
      str += `\["${s}"\]\["comments"\]`;
    }

    const getArrayData = (comments: any, i: any) => {
      if (i >= parentComments.length) {
        return responseCommentsList;
      }

      comments.forEach((comment: any) => {
        if (comment.id === parentComments[i]) {
          console.log("match : ", i, " ", comment);
          comment.comments = getArrayData(comment.comments, i + 1);
        }
      });

      return comments;
    };

    const newArr = getArrayData(commentsList, 0);
    console.log("NEW POST LIST : ", newArr);
    setCommentsList([...newArr]);

    return responseCommentsList;
  };

  const handleDeleteComment = async (
    // postId: any,
    comment: any,
    parentId: any,
    parentComments: any
  ) => {
    console.log("DELETING THE COMMENT", comment);
    console.log("COMMENT ID: ", comment.id);
    console.log("POST ID: ", comment.postId);
    console.log("PARENT ID: ", parentId);
    console.log("PARENT COMMENTS ARRAY: ", parentComments);
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
    console.log("NEW POST LIST : ", newArr);
    setCommentsList([...newArr]);
  };

  const handleEditComment = async (
    // postId: string,
    comment: any,
    text: string,
    parentComments: any
  ) => {
    console.log("ADDING THE COMMENT", comment);
    console.log("COMMENT: ", text);
    console.log("POST ID: ", comment.postId);
    console.log("COMMENT ID: ", comment.id);
    console.log("PARENT COMMENTS ARRAY: ", parentComments);
    const response: any = await updateComment({
      postId: comment.postId,
      message: text,
      id: comment.id,
    });

    console.log("EDITED COMMENT RESPONSE: ", response);

    const getArrayData = (comments: any, i: any) => {
      if (i === parentComments.length) {
        const newCommentsArray = comments.map((c: any) => {
          // console.log("id matching---------------------\n", c.id, commentId)
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
    console.log("NEW POST LIST : ", newArr);
    setCommentsList([...newArr]);
  };

  const handleAddComment = async (
    postId: string,
    parentId: any,
    text: string,
    parentComments: any
  ) => {
    console.log("ADDING THE COMMENT");
    console.log("COMMENT: ", text);
    console.log("POST ID: ", postId);
    console.log("PARENT ID: ", parentId);
    console.log("PARENT COMMENTS ARRAY: ", parentComments);
    const response: any = await createComment({
      postId: postId,
      message: text,
      parentId: parentId,
    });

    console.log("ADDED COMMENT RESPONSE: ", response);
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

    console.log("ADDED NEW COMMENT: ", newComment);

    const getArrayData = (comments: any, i: any) => {
      if (i == parentComments.length) {
        const newCommentsArray = [newComment, ...comments];
        return newCommentsArray;
      }

      comments.forEach((comment: any) => {
        if (comment.id === parentComments[i]) {
          console.log("match : ", i, " ", comment);
          comment.comments = getArrayData(comment.comments, i + 1);
        }
      });

      return comments;
    };

    const newArr = getArrayData(commentsList, 0);
    console.log("NEW POST LIST : ", newArr);
    setCommentsList([...newArr]);
  };

  return (
    <>
      <div style={{ marginLeft: "100px" }}>
        {commentsList.length > 0 && (
          <Comments
            comments={commentsList}
            postId={"15499a21-ac4c-4075-ab39-f1c9e8c70719"}
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
