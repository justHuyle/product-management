const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controllers/admin/categories.controller.js");
const validate = require("../../validates/admin/categories.validate");

router.get("/", controller.index);

// [GET] /admin/categories/create
router.get("/create", controller.create);

// [POST] /admin/categories/create
router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadCloud, 
    validate.createPost, 
    controller.createPost
);

// [GET] /admin/categories/edit/:id
router.get("/edit/:id", controller.edit);

// [PATCH] /admin/categories/edit/:id
router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadCloud, 
    validate.editPost, 
    controller.editPatch
);

// [DELETE] /admin/categories/delete/:id
router.delete("/delete/:id", controller.delete);

module.exports = router;
