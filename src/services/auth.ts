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
      // hashed password comapred to unhashed password, in that order
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
      console.log("Couldn't even try!")
      return done(error)
    }
  } else {
    console.log("No user exists error")
    return done(null, false, { message: "Incorrect login details" })
  }
}

export const getLogin = (req, res) => {
  res.render("login")
}

export const getSignUp = (req, res) => {
  res.render("signup")
}

const createUser = async (firstName, lastName, email, password) => {
  const data = {
    email,
    hashedPassword: await argon2.hash(password),
  }
  const result = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: data.email,
      password: data.hashedPassword,
    },
  })
  return result
}

export const postSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      const newUser = await createUser(firstName, lastName, email, password)
    }
  } catch (error) {
    console.error(error)
  }
  res.redirect("/login")
}
