export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
      upvote: 6,
      downvote: 1,
    },
    {
      id: "2",
      body: "Second comment",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
      upvote: 3,
      downvote: 1,
    },
    {
      id: "3",
      body: "First comment first child",
      username: "John",
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
      upvote: 5,
      downvote: 1,
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "John",
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
      upvote: 4,
      downvote: 1,
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString(),
    upvote: 0,
    downvote: 0,
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};

export const updateUpvote = async (no) => {
  return { no };
};

export const updateDownvote = async (no) => {
  return { no };
};
