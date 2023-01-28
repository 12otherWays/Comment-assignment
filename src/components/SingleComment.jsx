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
    <div key={comment.id} className="flex mb-4">
      <div className="comment-image-container mr-3 mt-2">
        <img
          className="rounded-full h-12 w-12 object-cover"
          src="https://picsum.photos/200/200.jpg"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <div className="text-2xl mr-2 text-blue-600">{comment.username}</div>
          <div className="text-xs">{createdAt}</div>
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
        <div className=" font-medium">{comment.body}</div>
        <div className="flex text-xs mt-3 cursor-pointe ">
          <div
            className="hover:underline text-emerald-600 mx-1"
            onClick={() => {
              setActiveComment({ id: comment.id, type: "replying" });
            }}
          >
            Reply
          </div>
          <div
            className="hover:underline text-yellow-500 mx-1"
            onClick={() => {
              setActiveComment({ id: comment.id, type: "editing" });
            }}
          >
            Edit
          </div>
          <div
            className="hover:underline text-red-700 mx-1"
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
          <div className="mt-5">
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
