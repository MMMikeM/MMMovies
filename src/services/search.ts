import axios from "axios"

export const moviePage = (req, res) => {
  res.render("search", {
    title: "MMMovie Search",
    message: "You have navigated to stuff!!!",
  })
}

export const searchMovie = async (req, res) => {
  const fetcher = async () => {
    try {
      return await axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${req.body.search}`
      )
    } catch (error) {
      console.error(error)
    }
  }

  const {
    data: { data },
  }: any = await fetcher()

  res.render("layout", {
    title: "MMMovie Search",
    content: JSON.stringify(data.movies, null, 2).replace(":", "/n"),
  })
}
