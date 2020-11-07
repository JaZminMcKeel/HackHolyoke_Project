const Express = require("express"); // requires the express framework
const bodyParser = require("body-parser"); // requires the body-parser module

const routes = require("./routes/"); // requires the local routes directory

const app = Express(); // initialises the app instance of Express

const port = process.env.PORT || 3000; // default port or 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes()); // all routes are routed to routes dir

app.listen(port, error => {
   if (error) throw console.error(error); // throws error if found
   console.log(`Listening on Port ${port}`); // acknowledges us that the server is running
});
