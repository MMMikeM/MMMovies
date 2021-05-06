export const checkAuth = (req, res, next) => {
  console.log("Checking auth: " + req.isAuthenticated())
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
    res.render("layout", { status: "Welcome!" })
  } else {
    res.render("index")
  }
}
