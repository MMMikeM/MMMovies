import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const genreData: Prisma.GenreCreateInput[] = [
  { name: "Action" },
  { name: "Adventure" },
  { name: "Crime" },
  { name: "Mystery" },
  { name: "Sci-Fi" },
  { name: "Thriller" },
]

const main = async () => {
  console.log(`Start seeding ...`)
  for (const g of genreData) {
    const genre = await prisma.genre.create({
      data: g,
    })
    console.log(`Created genre with id: ${genre.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
