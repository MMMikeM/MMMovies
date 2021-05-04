import { PrismaClient } from "@prisma/client";
import { Strategy, ExtractJwt } from "passport-jwt";

const prisma = new PrismaClient();

export const applyPassportStrategy = (passport) => {
  const options = { jwtFromRequest: "", secretOrKey: "" };
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = "SuperSecure";
  passport.use(
    new Strategy(options, async (payload, done) => {
      const user: any = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      return done(null, {
        email: user.email,
        id: user.id,
      });
    })
  );
};
