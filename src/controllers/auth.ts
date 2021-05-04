import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const prisma = new PrismaClient();

const createUser = async (firstName, lastName, email, password) => {
  console.log("yo");
  const data = {
    email,
    hashedPassword: await argon2.hash(password),
  };
  const result = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: data.email,
      password: data.hashedPassword,
    },
  });
  return result;
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      const validPassword = argon2.verify(user.password, password);

      const token = jwt.sign({ email }, "supersecure", { expiresIn: 1000000 });
      const userToReturn: any = { ...user, ...{ token } };

      delete userToReturn.password;
      console.log("I think this is a valid sign in?");
      res.status(200).json(userToReturn);
    }
  } catch (error) {
    console.error(error);
  }
  // res.render("signup");
};

export const getSignUp = (req, res) => {
  res.render("signup");
};

export const postSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      await createUser(firstName, lastName, email, password);
      const newUser: any = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      const token = jwt.sign({ email }, "supersecure", { expiresIn: 1000000 });
      const userToReturn = { ...newUser, ...{ token } };

      delete userToReturn.password;
      res.status(200).json(userToReturn);
    }
  } catch (error) {
    console.error(error);
  }
  // res.render("signup");
};
