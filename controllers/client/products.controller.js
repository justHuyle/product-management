const Product = require("../../models/products.models");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProducts = products.map(item => {
        item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: newProducts
    });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const product = await Product.findOne({
            slug: req.params.slug,
            status: "active",
            deleted: false
        });
        res.render("client/pages/products/detail.pug", {
            pageTitle: "Trang chi tiết sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm");
        res.redirect("/products");
    }
};