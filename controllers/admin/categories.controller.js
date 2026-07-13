const Category = require("../../models/category.models");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/categories
module.exports.index = async (req, res) => {
    let find = { deleted: false };
    const categories = await Category.find(find); 
    const treeCategories = createTreeHelper.tree(categories); 
    res.render("admin/pages/categories/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        categories: treeCategories
    });
}

// [GET] /admin/categories/create
module.exports.create = async (req, res) => {
    let find= {
        deleted: false
    };  
    const categories = await Category.find(find);
    const treeCategories = createTreeHelper.tree(categories);
    res.render("admin/pages/categories/create.pug", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        categories: treeCategories
    });
}

// [POST] /admin/categories/create
module.exports.createPost = async (req, res) => {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countCategories = await Category.countDocuments();
        req.body.position = countCategories + 1;
    }
    const category = new Category(req.body);
    await category.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
}

// [GET] /admin/categories/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, deleted: false });
        if (!category) {
            req.flash('error', 'Danh mục không tồn tại');
            return res.redirect(`${systemConfig.prefixAdmin}/categories`);
        }

        const categories = await Category.find({ deleted: false });
        const treeCategories = createTreeHelper.tree(categories);

        res.render("admin/pages/categories/edit.pug", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            category: category,
            categories: treeCategories
        });
    } catch (error) {
        console.error("Error fetching category for edit:", error);
        req.flash('error', 'Đã có lỗi xảy ra');
        res.redirect(`${systemConfig.prefixAdmin}/categories`);
    }
}

// [PATCH] /admin/categories/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({ _id: id, deleted: false });
        if (!category) {
            req.flash('error', 'Danh mục không tồn tại');
            return res.redirect(`${systemConfig.prefixAdmin}/categories`);
        }

        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countCategories = await Category.countDocuments({ _id: { $ne: id }, deleted: false });
            req.body.position = countCategories + 1;
        }

        await Category.updateOne({ _id: id }, req.body);
        req.flash('success', 'Cập nhật danh mục thành công');
        res.redirect(`${systemConfig.prefixAdmin}/categories`);
    } catch (error) {
        // console.error("Error updating category:", error);
        req.flash('error', 'Đã có lỗi xảy ra khi cập nhật');
        res.redirect(`${systemConfig.prefixAdmin}/categories`);
    }
}

// [DELETE] /admin/categories/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.updateOne({ _id: id }, { deleted: true });
        req.flash('success', 'Xóa danh mục thành công');
    } catch (error) {
        console.error("Error deleting category:", error);
        req.flash('error', 'Đã có lỗi xảy ra khi xóa');
    }
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
}
