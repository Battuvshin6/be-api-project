const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CategoryController = require("../controller/CategoryController.js");
const UserController = require("../controller/UserController.js");
const FoodContoller = require("../controller/FoodController");
const AuthenticationController = require("../controller/AuthenticationController.js");

//CATEGORIES
router.get("/category", CategoryController.getCategories);
router.post("/category", CategoryController.createCategories);
router.delete("/category", CategoryController.deleteCategories);
router.put("/category", CategoryController.updateCategories);

//USERS
router.get("/user", UserController.getUser);
router.post("/user", UserController.createUser);
router.delete("/user", UserController.deleteUser);
router.put("/user", UserController.updateUser);
router.post("/user/register", AuthenticationController.register);
router.get("/user/register", AuthenticationController.getRegister);
router.post("/user/login", AuthenticationController.login);
// FOOD MODEL
router.get("/food", FoodContoller.getFood);
router.post("/food", FoodContoller.createFood);
router.delete("/food", FoodContoller.deleteFood);
router.put("/food", FoodContoller.updateFood);

module.exports = router;
