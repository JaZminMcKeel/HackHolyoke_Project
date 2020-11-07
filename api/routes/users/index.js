const Express = require("express");

const { users } = require("../../dummy.json");

const router = Express.Router();

module.exports = () => {
   router.get("/", (req, res) => {
      res.status(200).json(users);
   });

   router.get("/:id", (req, res) => {
      // this route is used to fetch single user
      const userId = req.params.id;
      let theUser;
      users.forEach(user => {
         if (user.id === userId) {
            theUser = user;
            return;
         }
      });
      return res.status(200).json(theUser);
   });

   return router;
};
