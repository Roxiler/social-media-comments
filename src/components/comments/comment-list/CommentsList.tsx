// import { useState } from "react";
// import CommentsTextbox from "../comment-textbox/CommentsTextbox";
// import Comment from "../comment/Comment";
// import { useCommentsList } from "./hooks";

// interface ICommentList {
//   comments: any[];
//   showReplies?: any;
//   editComment: any;
//   deleteComment?: any;
//   makeComment?: any;
//   loggedInUserId: number;
//   postId: any;
//   parentComments: any[];
// }

// export const CommentsList = ({loggedInUserId, parentComments, comments, ...props}: any) => {
//   const { commentsData, handleAddComment } = useCommentsList(comments, props);

//   return (
//     <div>
//       <div>
//         {/* <CommentsTextbox
//           // setCommentData={props.setCommentData}
//           loggedInUserId={props.loggedInUserId}
//           handleAddComment={props.makeComment}
//           makeComment={props.makeComment}
//           parentComments={parentComments}
//           postId={props.postId}
//         /> */}
//         <div className="comments">
//           {commentsData.length > 0 &&
//             commentsData.map((comment: any, i: number) => {
//               console.log("Current comment: ", comment);
//               return (
//                 // <>
//                 <Comment
//                   key={`${Math.random().toFixed(5).toString()}-${i}`}
//                   data={comment.value}
//                   comments={[...comment.comments]}
//                   loggedInUserId={loggedInUserId}
//                   commentId={comment.id}
//                   parentComments={[...parentComments, comment.id]}
//                   {...props}
//                 />
//                 // </>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// };
