import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"
import { Strategy } from "passport-local"

const prisma = new PrismaClient()

export const authenticateUser = async (email, password, done) => {
  const user: any = await prisma.user.findUnique({
    where: { email: email },
  })
  if (user) {
    try {
      if (await argon2.verify(user.password, password)) {
        console.log("verified")
        return done(null, {
          email: user.email,
          id: user.id,
        })
      } else {
        console.log("wrong password error")
        return done(null, false, { message: "Incorrect login details" })
      }
    } catch (error) {
      console.log("Couldn't try!")
      return done(error)
    }
  } else {
    console.log("No user exists error")
    return done(null, false, { message: "Incorrect login details" })
  }
}
