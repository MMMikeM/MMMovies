const attachCurrentUser = async (req, res, next) => {
  const decodedTokenData = req.tokenData;
  const userRecord = ":)";
  // (await UserModel.findOne({ _id: decodedTokenData._id })) || ;

  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).end("User not found");
  } else {
    return next();
  }
};

export default attachCurrentUser;
