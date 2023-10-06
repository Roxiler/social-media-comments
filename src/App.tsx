import { useEffect, useState } from "react";
import { Comments } from "./components";
import "./styles.scss";
import {
  createComment,
  deleteComment,
  getCommentsOnPost,
  getRepliesOnComments,
  updateComment,
} from "./services/comments";
import _ from "lodash";

const initialComments = [
  {
    id: "14d3479f-61df-4f87-bf24-065dbd5f87f0",
    userName: "Kyle", // to be changed to commentor
    actions: ['EDIT', 'DELETE'],
    value: "I am a root comment",
    totalComments: 2,
    comments: [],
    // add creation time and updation time
    // add post id here itself
  },
  {
    id: "836911b1-ed36-4807-a776-51c96bdc20a2",
    userName: "Sally",
    actions: ['DELETE'],
    value: "I am another root comment",
    totalComments: 2,
    comments: [],
  },
];

function App() {
  const [postsList, setPostsList]: any = useState([]);
  const [commentsList, setCommentsList]: any = useState(initialComments);

  const handleShowReplies = async (commentId: any, parentComments: any) => {
    const response = await getRepliesOnComments(commentId);
    const responseCommentsList = response.map((comment: any) => {
      return {
        id: comment.id,
        userName: "John Doe",
        value: comment.message,
        totalComments: comment.children.length,
        comments: [],
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
    // setCommentsList(_.cloneDeep(newArr));

    return responseCommentsList;
  };

  const handleDeleteComment = async (
    postId: any,
    commentId: any,
    parentId: any,
    parentComments: any
  ) => {
    console.log("ADDING THE COMMENT");
    console.log("COMMENT ID: ", commentId);
    console.log("POST ID: ", postId);
    console.log("PARENT ID: ", parentId);
    console.log("PARENT COMMENTS ARRAY: ", parentComments);
    await deleteComment({
      postId: postId,
      id: commentId,
    });

    const getArrayData = (comments: any, i: any) => {
      if (i === parentComments.length) {
        const newCommentsArray = comments.filter((c: any) => {
          console.log("id matching---------------------\n", c.id, commentId);
          if (c.id !== commentId) {
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
    postId: string,
    commentId: any,
    text: string,
    parentComments: any
  ) => {
    console.log("ADDING THE COMMENT");
    console.log("COMMENT: ", text);
    console.log("POST ID: ", postId);
    console.log("COMMENT ID: ", commentId);
    console.log("PARENT COMMENTS ARRAY: ", parentComments);
    const response: any = await updateComment({
      postId: postId,
      message: text,
      id: commentId,
    });

    console.log("EDITED COMMENT RESPONSE: ", response);

    const getArrayData = (comments: any, i: any) => {
      if (i === parentComments.length) {
        const newCommentsArray = comments.map((c: any) => {
          // console.log("id matching---------------------\n", c.id, commentId)
          if (c.id === commentId) {
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

    const newComment = {
      id: response.id,
      userName: response.user.name,
      value: response.message,
      totalComments: 0,
      comments: [],
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
            loggedInUserId={"131e6072-0e8e-41ee-a7fe-e79913061ca6"}
            postId={"15499a21-ac4c-4075-ab39-f1c9e8c70719"}
            showReplies={handleShowReplies} // onShowReplies - change
            editComment={handleEditComment} // add 'on' prefix on all actions
            deleteComment={handleDeleteComment}
            makeComment={handleAddComment} // onAddComment
          />
        )}
      </div>
    </>
  );
}

export default App;
