// [GET] /admin/products
const Product = require("../../models/products.models");
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }

  // Pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts,
  );

  // End pagination
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang quản lý sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect(req.get("Referer") || "/admin/products");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật ${ids.length} sản phẩm thành công`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật ${ids.length} sản phẩm thành công`);
      break;
    case "delete":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      break;
    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-");
        await Product.updateOne({ _id: id }, { position: parseInt(position) });
      }
      break;
    default:
      break;
  }
  res.redirect(req.get("Referer") || "/admin/products");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() },
  );
  res.redirect(req.get("Referer") || "/admin/products");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id, deleted: false });
    if (!product) {
      req.flash("error", "Không tìm thấy sản phẩm");
      res.redirect(`${systemConfig.prefixAdmin}/products`);
      return;
    }
    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${id}`);
  } catch (error) {
    res.flash("error", "Lỗi khi cập nhật sản phẩm");
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${id}`);
  }
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id, deleted: false });
    if (!product) {
      req.flash("error", "Không tìm thấy sản phẩm");
      res.redirect(`${systemConfig.prefixAdmin}/products`);
      return;
    }
    res.render("admin/pages/products/detail.pug", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};