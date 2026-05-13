const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: `Access denied: ${allowedRoles.join(' or ')} only` });
    }

    next();
  };
};

const managerOnly = allowRoles('manager');

module.exports = {
  managerOnly,
  allowRoles,
};
