import React, { useState } from "react";

function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) {
  const [text, setText] = useState(initialText);
  const btnDisable = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <textarea
          name="form"
          cols="30"
          rows="10"
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="comment-form-button" disabled={btnDisable}>
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="comment-form-button comment-form-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
}

export default CommentForm;
