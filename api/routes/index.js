const Express = require("express");

const treesRoute = require("./trees/");
const usersRoute = require("./users/");
const loginRoute = require("./login/");
const signupRoute = require("./signup/");

const router = Express.Router();

module.exports = () => {
   router.get("/", (req, res) => {
      return res.status(200).json({ status: "OK" });
   });

   router.use("/trees", treesRoute()); // all calls (get/posts) to trees will be routed to trees directory

   router.use("/users", usersRoute()); // all calls (get/posts) to users will be routed to users directory

   router.use("/login", loginRoute()); // all calls (get) to login will be routed to login directory

   router.use("/signup", signupRoute()); // all calls (post) to signup will be routed to signup directory

   return router;
};
