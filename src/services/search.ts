import axios from "axios"
import NodeCache from "node-cache"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const myCache = new NodeCache({ stdTTL: 6000, checkperiod: 6000 })

export const moviePage = (req, res) => {
  res.render("search", {
    title: "MMMovie Search",
    message: "You have navigated to stuff!!!",
  })
}

export const saveMovie = async (req, res) => {
  // req.user.id
  const movieData = req.body.movieIds.map((movieId) => {
    const tempData: any = myCache.get(movieId)
    tempData.userId = req.user.id
    return tempData
  })

  const results = await prisma.movie.createMany({
    data: movieData,
  })

  console.log(results)

  res.render("search", {
    title: "MMMovie Search",
    message: "You have navigated to stuff!!!",
  })
}

export const searchMovie = async (req, res) => {
  const fetchedData = async () => {
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
  }: any = await fetchedData()

  const cleanedData = data.movies.map((movie) => {
    const cleanedMovie = {
      movieId: movie.id,
      title: movie.title,
      year: movie.year,
      rating: movie.rating,
      summary: movie.summary,
      url: movie.medium_cover_image,
    }

    myCache.set(movie.id, cleanedMovie)

    return cleanedMovie
  })

  res.render("layout", {
    title: "MMMovie Search",
    content: cleanedData,
  })
}
