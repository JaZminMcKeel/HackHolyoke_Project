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
               .collection("trees")
               .find()
               .toArray()
               .then(trees => {
                  return res.status(200).json(trees);
               });
         })
         .catch(err => {
            console.log(err);
            return res.status(500);
         });
   });

   router.get("/:id", (req, res) => {
      // this route is used to fetch single tree
      const treeId = req.params.id;
      mongoClient
         .then(client => {
            client
               .db(db)
               .collection("trees")
               .findOne({ id: treeId })
               .then(tree => {
                  return res.status(200).json(tree);
               });
         })
         .catch(err => {
            console.log(err);
            return res.status(500);
         });
   });

   return router;
};
