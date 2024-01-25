import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { moviesServices } from "../../infraestructure/services/movies.services";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import Modal from "../../components/Modal/Modal";
import leftArrowIcon from "../../img/icons/leftArrow.svg";
import notesIcon from "../../img/icons/notes.svg";
import { generalServices } from "../../infraestructure/services/general.services";

const Comments = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [innerWidth, setInnerWidth] = useState();
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
      .getMovie(id)
      .then((data) => setMovieData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    setInnerWidth(window.innerWidth);
  }, []);

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

  const formatDate = (date) => {
    return generalServices().formatDate(date);
  };

  const handleFormChange = (value, type) => {
    setFormData((data) => ({
      ...data,
      [type]: value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAddComment(false);
    fetchData();
  };

  const printComments = () => {
    if (!movieData.comments?.length) {
      return (
        <div className="text-4xl text-center text-bold pt-12 flex flex-col items-center">
          <img src={notesIcon} alt="notes icon" />
          <p className="pt-8">There are no comments yet.</p>
          <p className="pt-4">Be the first to leave one!</p>
        </div>
      );
    } else {
      const commentsList = movieData.comments.map((comment) => {
        console.log(comment);
        return (
          <div
            className="p-4 bg-cyberDarkBlue border-2 border-cyberBlue rounded-lg"
            index={comment.id}
          >
            <div className="font-bold border-b text-lg flex justify-between">
              <p>{comment.title}</p>
              <p>{formatDate(comment.createdAt)}</p>
            </div>
            <p className="pt-2">{comment.comment}</p>
          </div>
        );
      });
      return commentsList;
    }
  };

  const addCommentForm = (
    <div className="flex flex-col gap-4 w-95%">
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
      <img
        src={leftArrowIcon}
        alt="left-arrow-icon"
        className="absolute top-4 left-3"
        onClick={() => navigate("/")}
      />
      <h2
        className={`text-center p-4 text-lg font-bold ${
          innerWidth < 410 ? "pt-12" : ""
        }`}
      >
        Comments for {movieData.title}
      </h2>

      <div className="pb-2 pl-3 pr-3 flex flex-col gap-4">
        {!addComment ? (
          <div>
            <div className="flex justify-end">
              <Button text="Add Comment" onClick={() => setAddComment(true)} />
            </div>
            <div className="pt-8 flex flex-col gap-4">{printComments()}</div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end">
              <Button
                text="Back to Comments"
                onClick={() => setAddComment(false)}
              />
            </div>
            <div className="flex flex-col items-center">
              {addCommentForm}
              <div className="pt-4 w-257px ">
                <Button text="Send comment" onClick={postComment} />
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal ? (
        <Modal onClose={handleCloseModal}>
          <p className="text-center w-150px text-lg font-bold">
            {modalMessage}
          </p>
        </Modal>
      ) : null}
    </div>
  );
};

export default Comments;
