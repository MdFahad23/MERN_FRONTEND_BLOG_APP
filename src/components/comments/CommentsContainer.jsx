import React, { useEffect, useState } from "react";

import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";
import Comment from "./Comment";

const CommentsContainer = ({ className, logginedUserId }) => {
  const [comment, setComment] = useState([]);
  const mainComments = comment.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);

  console.log(comment);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComment(commentData);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };
    setComment((curState) => {
      return [newComment, ...curState];
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    const updateComments = comment.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComment(updateComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    const updateComment = comment.filter((comment) => {
      return comment._id !== commentId;
    });
    setComment(updateComment);
  };

  const getRepliesHandler = (commentsId) => {
    return comment
      .filter((comment) => comment.parent === commentsId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHanlder={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={getRepliesHandler(comment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
