import axios from "axios";

export const moviePage = (req, res) => {
  res.render("search", {
    title: "MMMovie Search",
    message: "You have navigated to stuff!!!",
  });
};

export const searchMovie = async (req, res) => {
  console.log(req.body);
  const fetcher = async () => {
    try {
      return await axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${req.body.search}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const searchResults: any = await fetcher();

  console.log(searchResults.data.data.movies);

  res.render("index", {
    title: "MMMovie Search",
    message: JSON.stringify(searchResults.data.data.movies, null, 2).replace(
      ":",
      "/n"
    ),
  });
};
