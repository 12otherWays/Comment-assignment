import CommentForm from "./CommentForm";

function SingleComment({
  comment,
  replies,
  currentUserId,
  deleteComment,
  updateComment,
  addCommnet,
  activeComment,
  setActiveComment,
  parentId = null,

  upvote,
  downvote,
  setUpvote,
  setDownvote,
}) {
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img
          src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/passport/1-change.jpg"
          alt=""
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-text">{comment.body}</div>
        <div className="comment-actions">
          <div className="comment-action"
            onClick={() => {
              setActiveComment({ id: comment.id, type: "replying" });
            }}
          >
            Reply
          </div>
          <div
            className="comment-action"
            onClick={() => {
              setActiveComment({ id: comment.id, type: "editing" });
            }}
          >
            Edit
          </div>
          <div
            className="comment-action"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </div>
          {/* <div onClick={(no) => setUpvote(no, comment.id)}>
            &uarr; {comment.upvote}
          </div>
          <div onClick={() => setDownvote(comment.id)}>
            &darr; {comment.downvote}
          </div> */}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addCommnet(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <SingleComment
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                addCommnet={addCommnet}
                parentId={comment.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                
                upvote={upvote}
                setUpvote={setUpvote}
                downvote={downvote}
                setDownvote={setDownvote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
