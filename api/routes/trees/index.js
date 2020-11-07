const Express = require("express");

const { trees } = require("../../dummy.json");

const router = Express.Router();

module.exports = () => {
   router.get("/", (req, res) => {
      res.status(200).json(trees);
   });

   router.get("/:id", (req, res) => {
      // this route is used to fetch single tree
      const treeId = req.params.id;
      let theTree;
      trees.forEach(tree => {
         if (tree.id === treeId) {
            theTree = tree;
            return;
         }
      });
      res.status(200).json(theTree);
   });

   return router;
};
