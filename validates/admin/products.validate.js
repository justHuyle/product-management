module.exports.createPost = async (req, res, next) => {
    const errors = [];
    if (!req.body.title) {
        errors.push("Vui lòng nhập tên sản phẩm");
    }
    if (!req.body.price) {
        errors.push("Vui lòng nhập giá sản phẩm");
    }
    if (!req.body.stock) {
        errors.push("Vui lòng nhập số lượng sản phẩm");
    }
    if (errors.length > 0) {
        req.flash("error", errors.join(", "));
        res.redirect(req.get("Referer") || "/admin/products");
        return;
    }   
    next(); 
};