const Express = require("express");
const MongoClient = require("mongodb").MongoClient;

const router = Express.Router();

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const db = process.env.DB;

const collectionUsers = "users";
const collectionTrees = "trees";

const mongoClient = MongoClient.connect(
   `mongodb+srv://${userName}:${password}@shaoor-tech.djiac.mongodb.net/${db}?retryWrites=true&w=majority`,
   { useUnifiedTopology: true }
);

module.exports = () => {
   router.get("/", (req, res) => {
      const { userId, treeId } = req.body;
      mongoClient.then(client => {
         client
            .db(db)
            .collection(collectionTrees)
            .findOne({ id: treeId })
            .then(tree => {
               mongoClient.then(client => {
                  client
                     .db(db)
                     .collection(collectionUsers)
                     .updateOne(
                        { id: userId },
                        { $push: { cart: tree } },
                        (err, result) => {
                           if (err) throw err;
                           else
                              return res
                                 .status(200)
                                 .json({ status: "success" });
                        }
                     );
               });
            });
      });
   });

   return router;
};
