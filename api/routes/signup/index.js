const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const uuid = require("uuid");

const router = Express.Router();

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const db = process.env.DB;
const collection = "users";

const mongoClient = MongoClient.connect(
   `mongodb+srv://${userName}:${password}@shaoor-tech.djiac.mongodb.net/${db}?retryWrites=true&w=majority`,
   { useUnifiedTopology: true }
);

module.exports = () => {
   router.post("/", (req, res) => {
      console.log(req.body);
      const {
         firstName,
         lastName,
         email,
         phone,
         username,
         password,
         dateOfBirth,
         payment,
         creditCard,
         ccv,
         expires,
         address,
      } = req.body;
      mongoClient
         .then(client =>
            client
               .db(db)
               .collection(collection)
               .findOne({ username: username })
               .then(user => {
                  if (user) return false;
                  else return true;
               })
         )

         .then(result => {
            console.log(result);
            if (result)
               if (
                  !firstName ||
                  !lastName ||
                  !email ||
                  !phone ||
                  !username ||
                  !password ||
                  !dateOfBirth ||
                  !payment ||
                  !creditCard ||
                  !ccv ||
                  !expires ||
                  !address
               )
                  return res
                     .status(422)
                     .json({ status: "failed", reason: "missing fields" });
               else
                  mongoClient
                     .then(client =>
                        client
                           .db(db)
                           .collection(collection)
                           .insertOne({
                              id: uuid.v4().replace(/-/g, ""),
                              firstName: firstName,
                              lastName: lastName,
                              email: email,
                              phone: phone,
                              username: username,
                              password: password,
                              dateOfBirth: dateOfBirth,
                              payment: payment,
                              creditCard: creditCard,
                              ccv: ccv,
                              expires: expires,
                              address: address,
                              cart: [],
                           })
                           .then(user => {
                              return res.status(201).json(user);
                           })
                           .catch(error => {
                              if (error) return res.status(422).json(error);
                           })
                     )
                     .catch(error => {
                        if (error) return res.status(500).json(error);
                     });
            else return res.status(406).json({ status: "failed" });
         });
   });

   return router;
};
