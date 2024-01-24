import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";

import { useNavigate } from "react-router-dom";
import { moviesServices } from "../infraestructure/services/movies.services";
import Modal from "../components/Modal/Modal";
import Rating from "../components/Rating/Rating";
const Home = () => {
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState([]);
  const [showRateModal, setShowRateModal] = useState("");

  useEffect(() => {
    const fetchData = () => {
      moviesServices()
        .getMovies()
        .then((data) => setMoviesData(data))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  const handleShowComments = (movie) => {
    navigate(`comments/${movie._id}`);
  };

  const submitRating = (rate) => {
    const userId = localStorage.getItem("token");
    const rateData = {
      userId: userId,
      rate: rate
    };
    moviesServices()
      .rateMovie(showRateModal, rateData)
      .then((res) => {
        console.log("test send");
      });
  };
  const movieRating = (
    <div className="flex gap-2">
      <span className="border border-cyberPink p-2 rounded" />
      <span className="border border-cyberPink p-2 rounded" />
      <span className="border border-cyberPink p-2 rounded" />
      <span className="border border-cyberPink p-2 rounded" />
      <span className="border border-cyberPink p-2 rounded" />
    </div>
  );

  const printMovieList = () => {
    if (!moviesData.length) return;
    else {
      const movieList = moviesData?.map((movie) => {
        return (
          <div
            className="p-4 bg-cyberDarkBlue border-2 border-cyberBlue rounded-lg relative"
            key={movie._id}
          >
            <div className="flex justify-center items-center">
              <img className="w-150" src={movie.cover}></img>
            </div>
            <div>
              <p className="font-bold text-xl text-cyberPink pt-4 pb-4">
                {movie.title}
              </p>
              <p>{movie.synopsis}</p>
              <div className="flex justify-end gap-28 p-4 items-center">
                <div>
                  <div className="border border-cyberTurquoise rounded-full flex justify-center pl-4 pr-4 pt-1.5 pb-1.5">
                    <p className="text-3xl ">{movie.averageRate}</p>
                  </div>
                  <Button
                    text="Rate movie"
                    onClick={() => setShowRateModal(movie._id)}
                  />
                </div>

                <Button
                  text="Show comments"
                  onClick={() => handleShowComments(movie)}
                />
              </div>
            </div>
            {showRateModal === movie._id ? (
              <Modal onClose={() => setShowRateModal(false)}>
                <Rating
                  bulletsQuantity={5}
                  submitRate={(rate) => submitRating(rate)}
                />
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
      <h2 className="text-center p-4">Movie Database</h2>
      <div className="pt-1 pl-3 pr-3 flex flex-col gap-4">
        {printMovieList()}
      </div>
    </div>
  );
};

export default Home;
