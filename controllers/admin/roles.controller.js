const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");
// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const roles = await Role.find(find);
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Quản lý vai trò",
    roles: roles,
  });
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Thêm vai trò",
  });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, deleted: false });
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa vai trò",
      role: role,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    await Role.updateOne({ _id: req.params.id, deleted: false }, req.body);
    req.flash("success", "Cập nhật thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  const roles = await Role.find(find);

  res.render("admin/pages/roles/permissions.pug", {
    pageTitle: "Phân quyền vai trò",
    roles: roles,
  });
};

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  let permissions = JSON.parse(req.body.permissions);

  for (const item of permissions) {
    await Role.updateOne({ _id: item.id, deleted: false }, { permissions: item.permissions });
  }

  req.flash("success", "Cập nhật thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
};
