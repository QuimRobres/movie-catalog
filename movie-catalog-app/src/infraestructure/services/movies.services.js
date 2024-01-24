import { http } from "../plugins/http/http";

export const moviesServices = () => ({
  getMovies: async () => {
    let movieData = [];

    await http.get("/movies").then((data) => {
      movieData = data;
    });
    return movieData;
  },

  getMovieComments: async (id) => {
    let movieData = [];

    await http.get(`/movies/${id}/comments`).then((data) => {
      movieData = data;
    });

    return movieData;
  },

  postComment: async (id, comment) => {
    let returnValue = "";
    await http
      .post(`/movies/${id}/postComment`, comment)
      .then((response) => {
        returnValue = response.message;
      })
      .catch((err) => {
        console.error(err);
        if (err.message) returnValue = err?.message;
        else
          returnValue =
            "There was an error while posting your comment. Try it again in a few minutes";
      });
    return returnValue;
  },

  rateMovie: async (id, rateData) => {
    let returnValue = "";
    await http
      .post(`/movies/${id}/rate`, rateData)
      .then((res) => {
        returnValue = res.message;
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          returnValue = err?.response?.data?.message;
        else
          returnValue =
            "There was an error while rating the movie. Try it again in a few minutes";
      });
    return returnValue;
  },
});
