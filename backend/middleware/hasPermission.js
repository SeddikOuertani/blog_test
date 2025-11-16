module.exports = function hasPermission(permission) {
  return (req, res, next) => {
    if (!req.user || !req.user.role)
      return res.status(403).json({ message: 'Forbidden' });

    const perms = req.user.role.permissions;

    // Example permission string: "article:update:any"
    if (!perms.includes(permission))
      return res.status(403).json({ message: 'Permission denied' });

    next();
  };
};
