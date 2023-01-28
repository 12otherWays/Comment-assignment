import { useState, useEffect } from "react";
import {
  getComments,
  createComment,
  deleteComment as deleteSingleComment,
  updateComment as updateCommentApi,
  updateUpvote,
  // updateDownvote,
} from "../api";
import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";

function Comments({ currentUserId }) {
  const [allComments, setAllComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [upvote, setUpvote] = useState(5);
  const [downvote, setDownvote] = useState(5);

  const parentComment = allComments.filter(
    (comment) => comment.parentId === null
  );
  const getReplies = (commentId) => {
    return allComments
      .filter((singleComment) => singleComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };
  const addComment = (text, parentId) => {
    createComment(text, parentId).then((comment) => {
      setAllComments([comment, ...allComments]);
      setActiveComment(null);
    });
  };
  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedAllComments = allComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, body: text };
        }
        return comment;
      });
      setAllComments(updatedAllComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure want to deleet comment?")) {
      deleteSingleComment(commentId).then(() => {
        const updateAllComments = allComments.filter(
          (singleComment) => singleComment.id !== commentId
        );
        setAllComments(updateAllComments);
      });
    }
  };

  const upVote = (upvote, commentId) => {
    updateUpvote(upvote).then(() => {
      const updatedAllComments = allComments.map((comment) => {
        if (comment.id === commentId) {
          console.log(comment.id);
          return { ...comment, upvote: upvote++ };
        }
        return comment;
      });
      setAllComments(updatedAllComments);
      setActiveComment(null);
    });
    // console.log(upvote);
    // setUpvote(upvote++);
  };

  useEffect(() => {
    getComments().then((data) => {
      setAllComments(data);
    });
  }, []);

  return (
    <div className="mt-0">
      <h3 className="font-medium leading-tight text-5xl my-4 text-blue-600">
        Comments
      </h3>
      <div className="text-2xl">Write comment</div>
      <CommentForm submitLabel="Comment" handleSubmit={addComment} />
      <div className="co">
        {parentComment.map((childComment) => {
          return (
            <SingleComment
              key={childComment.id}
              comment={childComment}
              replies={getReplies(childComment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addCommnet={addComment}
              updateComment={updateComment}
              upvote={upvote}
              downvote={downvote}
              setUpvote={upVote}
              setDownvote={setDownvote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
