module.exports.createPost = async (req, res, next) => {
    const errors = [];
    if (!req.body.title) {
        errors.push("Vui lòng nhập tên danh mục");
    }
    if (!req.body.position) {
        errors.push("Vui lòng nhập vị trí danh mục");
    }
    if (errors.length > 0) {
        req.flash("error", errors.join(", "));
        res.redirect(req.get("Referer") || "/admin/categories");
        return;
    }   
    next(); 
};

module.exports.editPost = async (req, res, next) => {
    const errors = [];
    if (!req.body.title) {
        errors.push("Vui lòng nhập tên danh mục");
    }
    if (errors.length > 0) {
        req.flash("error", errors.join(", "));
        res.redirect(req.get("Referer") || "/admin/categories");
        return;
    }   
    next(); 
};