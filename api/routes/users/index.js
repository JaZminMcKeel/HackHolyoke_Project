const { json } = require("body-parser");
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;

const router = Express.Router();

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const db = process.env.DB;
const mongoClient = MongoClient.connect(
   `mongodb+srv://${userName}:${password}@shaoor-tech.djiac.mongodb.net/${db}?retryWrites=true&w=majority`,
   { useUnifiedTopology: true }
);

module.exports = () => {
   router.get("/", (req, res) => {
      mongoClient
         .then(client => {
            client
               .db(db)
               .collection("users")
               .find()
               .toArray()
               .then(users => {
                  return res.status(200).json(users);
               });
         })
         .catch(err => {
            console.log(err);
            return res.status(500);
         });
   });

   router.get("/:id", (req, res) => {
      // this route is used to fetch single user
      const userId = req.params.id;
      mongoClient
         .then(client => {
            client
               .db(db)
               .collection("users")
               .findOne({ id: userId })
               .then(user => {
                  return res.status(200).json(user);
               });
         })
         .catch(err => {
            console.log(err);
            return res.status(500);
         });
   });

   return router;
};
