const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/idOverlapChk", userController.idOverlapChk);

router.post("/regist", userController.regist);

router.post("/registWithDID", userController.registWithDID);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/sendToken", userController.sendToken);

router.post("/getPoint", userController.getPoint);

router.post("/buyItem", userController.buyItem);

router.get("/authDID", userController.authDID);

router.post("/withdrawDID", userController.withdrawDID);

router.get("/DIDlogin", userController.DIDlogin);

router.get("/redirectURI", userController.redirectURI);

router.post("/viewPoint", userController.viewPoint);

router.post("/allowPoint", userController.allowPoint);

module.exports = router;
