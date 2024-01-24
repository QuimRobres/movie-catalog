import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesServices } from "../../infraestructure/services/movies.services";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import Modal from "../../components/Modal/Modal";

const Comments = () => {
  const { id } = useParams();

  const [addComment, setAddComment] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    comment: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fetchData = () => {
    moviesServices()
      .getMovieComments(id)
      .then((data) => setMovieData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (value, type) => {
    setFormData((data) => ({
      ...data,
      [type]: value,
    }));
  };

  const postComment = () => {
    const userId = localStorage.getItem("token");
    const commentData = {
      ...formData,
      userId: userId,
    };
    moviesServices()
      .postComment(id, commentData)
      .then((response) => {
        setModalMessage(response);
        setShowModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAddComment(false);
    fetchData();
  };
  const printComments = () => {
    if (!movieData.comments?.length) {
      return <div>nada</div>;
    } else {
      const commentsList = movieData.comments.map((comment) => {
        return (
          <div
            className="p-4 bg-cyberDarkBlue border-2 border-cyberBlue rounded-lg"
            index={comment.id}
          >
            <p className="font-bold">{comment.userName}</p>
            <p className="pt-2">{comment.comment}</p>
          </div>
        );
      });
      return commentsList;
    }
  };

  const addCommentForm = (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        label="Title"
        handleChange={(value) => handleFormChange(value, "title")}
      />
      <Textarea
        maxLength="600"
        label="Comment"
        handleChange={(value) => handleFormChange(value, "comment")}
      />
    </div>
  );

  return (
    <div>
      <h2 className="text-center p-4 text-lg font-bold">
        Comments for {movieData.title}
      </h2>

      <div className="pb-2 pl-3 pr-3 flex flex-col gap-4">
        {!addComment ? (
          <>
            <div className="flex justify-end">
              <Button text="Add Comment" onClick={() => setAddComment(true)} />
            </div>

            {printComments()}
          </>
        ) : (
          <>
            {addCommentForm}
            <Button text="send" onClick={postComment} />
          </>
        )}
      </div>

      {showModal ? (
        <Modal onClose={handleCloseModal}>
          <p>{modalMessage}</p>
        </Modal>
      ) : null}
    </div>
  );
};

export default Comments;
