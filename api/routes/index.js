const Express = require("express");

const treesRoute = require("./trees/");
const usersRoute = require("./users/");

const router = Express.Router();

module.exports = () => {
   router.get("/", (req, res) => {
      return res.status(200).json({ status: "OK" });
   });

   router.use("/trees", treesRoute()); // all calls (get/posts) to trees will be routed to trees directory

   router.use("/users", usersRoute()); // all calls (get/posts) to users will be routed to users directory

   return router;
};