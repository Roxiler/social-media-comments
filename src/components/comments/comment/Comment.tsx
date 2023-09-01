import React from "react";
import "./styles.scss";
import Home from "../../icons/home-icon/home";
import { useComments } from "./hooks";

interface IComment {
  data: string;
  comments: any[];
  showReplies?: any;
  editComment?: any;
  deleteComment?: any;
}

const Comment = (props: IComment) => {

    const {
        replies,
        handleShowReplies,
        isRepliesOpen
    } = useComments();

  return (
    <div>
      <div className="comment__box">
        {/* <div className="comment">{props.data}</div> */}
        {/* <div className="nested_comment">
          {props.comments.map((comment, i) => {
            return (
              <Comment
                key={i}
                comments={comment.comments}
                data={comment.value}
              />
            );
          })}
        </div> */}
        <div className="comment__text">{props.data}</div>
        <div className="comment__actions">
          <div onClick={() => handleShowReplies(props.showReplies, 1)}>
            <Home />
          </div>
          <div>
            <Home />
          </div>
          <div>
            <Home />
          </div>
        </div>
        <div className="comment__replies">
        {
            isRepliesOpen && replies.length > 0 &&
            <div>
                {replies.map((comment: any, i: number) => {
            return (
              <Comment
              key={i}
              data={comment.value}
              comments={comment.comments}
              showReplies={props.showReplies}
              editComment={props.editComment}
              deleteComment={props.deleteComment}
              />
            );
          })}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Comment;
