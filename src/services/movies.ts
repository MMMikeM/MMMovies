import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const toWatch = async (req, res) => {
  try {
    const results = await prisma.movie.findMany({
      where: {
        userId: {
          equals: req.user.id,
        },
      },
    })

    res.render("layout", {
      title: "MMMovies I've watched",
      message: "You have navigated to stuff!!!",
      content: results,
    })
  } catch (error) {
    res.redirect("/search")
  }
}
