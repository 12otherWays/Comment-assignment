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
          rows="4"
          className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        my-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your comment"
        />
        <button
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-4"
          disabled={btnDisable}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className=" inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-4"
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
