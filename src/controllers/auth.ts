import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"
const authServices = require("../services/auth")

const prisma = new PrismaClient()

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
  res.render("signup")
}

export const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

export const checkNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }
  next()
}

export const getLanding = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("layout")
  } else {
    res.render("index")
  }
}
