const express = require("express");
const router = express.Router();
const db = require("../config/db/db.js");
const controller = require("../controller/index.js");

router.get("/", controller.scrap.getAll);
router.get("/itemid", controller.scrap.getItemIdComp);
router.get("/email", controller.scrap.getEmailComp);
router.get("/draft", controller.scrap.getEmailUnComp);
router.get("/title", controller.scrap.getOneTitle);
router.get("/category", controller.scrap.getOneCateg);
router.get("/like", controller.scrap.getLike);
router.post("/post", controller.scrap.post);
router.put("/put", controller.scrap.put);
// router.put('/del', controller.scrap.delete);

module.exports = router;

