import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized 1" });
    }

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized 2" });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized 3" });
  }
};

export default authMiddleware;
