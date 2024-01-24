import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";

import { useNavigate } from "react-router-dom";
import { moviesServices } from "../infraestructure/services/movies.services";
import Modal from "../components/Modal/Modal";
import Rating from "../components/Rating/Rating";
import Loader from "../components/Loader/Loader";
import movieIcon from "../img/icons/movie.svg";
import powerOffIcon from "../img/icons/powerOff.svg";
import { authServices } from "../infraestructure/services/auth.services";
const Home = () => {
  const navigate = useNavigate();

  const [innerWidth, setInnerWidth] = useState();
  const [moviesData, setMoviesData] = useState([]);
  const [showRateModal, setShowRateModal] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    moviesServices()
      .getMovies()
      .then((data) => {
        setMoviesData(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    setInnerWidth(window.innerWidth);
  }, []);

  const handleShowComments = (movie) => {
    navigate(`comments/${movie._id}`);
  };

  const handleCloseModal = () => {
    setShowRateModal(false);
    setModalMessage("");
    fetchData();
  };

  const submitRating = (rate) => {
    const userId = localStorage.getItem("token");
    const rateData = {
      userId: userId,
      rate: rate,
    };
    moviesServices()
      .rateMovie(showRateModal, rateData)
      .then((response) => {
        setModalMessage(response);
      });
  };

  const handleLogout = () => {
    authServices()
      .logout()
      .then((res) => {
        if (res === "Success") navigate("/auth");
      });
  };

  const printMovieList = () => {
    if (!moviesData.length)
      return (
        <div className="text-4xl text-center text-bold pt-24 flex flex-col items-center">
          <img src={movieIcon} alt="notes icon" />
          <p className="pt-8">No movie data yet</p>
        </div>
      );
    else {
      const movieList = moviesData?.map((movie) => {
        return (
          <div
            className="p-4 bg-cyberDarkBlue border-2 border-cyberBlue rounded-lg relative max-w-xl"
            key={movie._id}
          >
            <div className="flex justify-center items-center">
              <img
                className="w-257px"
                src={movie.cover}
                alt={`${movie.title} cover`}
              />
            </div>
            <div>
              <p className="font-bold text-xl text-cyberPink pt-4 pb-4">
                {movie.title}
              </p>
              <p>{movie.synopsis}</p>
              <div
                className={`flex justify-between p-1 pt-6 items-center ${
                  innerWidth < 451 ? "flex-col" : ""
                }`}
              >
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="border border-cyberTurquoise rounded-full w-62px h-62px flex justify-center items-center">
                    <p className="text-3xl ">{movie.averageRate}</p>
                  </div>
                  <Button
                    text="Rate movie"
                    onClick={() => setShowRateModal(movie._id)}
                  />
                </div>
                <div
                  className={`${innerWidth < 451 ? "pt-8" : "pt-14"} w-150px`}
                >
                  <Button
                    text="Show comments"
                    onClick={() => handleShowComments(movie)}
                  />
                </div>
              </div>
            </div>
            {showRateModal === movie._id ? (
              <Modal onClose={handleCloseModal}>
                {modalMessage ? (
                  <p className="text-center text-lg font-bold">
                    {modalMessage}
                  </p>
                ) : (
                  <Rating
                    bulletsQuantity={5}
                    submitRate={(rate) => submitRating(rate)}
                    rateText={"movie"}
                  />
                )}
              </Modal>
            ) : null}
          </div>
        );
      });
      return movieList;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2">
          <Loader />
        </div>
      ) : (
        <div>
          <div
            className="bg-cyberBlue rounded-full absolute right-3 top-3 flex items-center"
            onClick={handleLogout}
          >
            <img src={powerOffIcon} alt="power off" className="p-0.5" />
          </div>

          <h2 className="text-center p-4 text-4xl font-bold pt-8 ">
            Movie Database
          </h2>
          <div className={`p-3 flex flex-col items-center gap-4`}>
            {printMovieList()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
