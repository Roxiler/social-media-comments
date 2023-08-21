import { CommentsList } from "./comment-list/CommentsList";


interface Props {
    comments: [];
}

export const Comments = (props: Props) => {

    const {comments} = props;

    return (
        <div>
            <CommentsList comments={comments}/>
        </div>
    )
}