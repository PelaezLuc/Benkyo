const { getConnection } = require('../../v1/database/getConnection');
const { generateError } = require('../helpers/generateError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userAuth = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Header Authorization Missing', 401);
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Unvalid Token', 401);
    }

    const [user] = await connection.query(
      `SELECT * FROM user WHERE id = ?`,
      [tokenInfo.id]
    );

    if (user.length < 1) {
      throw generateError('Unvalid Token', 401);
    }

    req.userAuth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
  finally {
    if (connection) connection.release();
  }
};

module.exports = {
  userAuth,
};
