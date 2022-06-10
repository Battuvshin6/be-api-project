const { default: mongoose } = require("mongoose");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const AddressSchema = require("../models/address.js");
const bcrypt = require("bcryptjs");

const getRegister = (req, res, next) => {
  AddressSchema.find({}, (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json({
        success: true,
        data: data,
      });
    }
  });
};

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = await users.findOne({ email: data.email });
  if (oldUser) {
    return res.status(401).json({
      status: "User already exists!",
      success: false,
    });
  }
  let bcrypt = require("bcryptjs");
  let hashedPassword = bcrypt.hashSync(data.password, 10);
  data.password = hashedPassword;
  data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
  data.created_date = Date("Y-m-d");
  data.last_activity = Date("Y-m-d h:m:s");
  const email = data.email;

  users.create(data).then((data) => {
    const token = jwt.sign(
      { user_id: data._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({
      status: "success",
      data: data,
      token: token,
    });
  });
};

const login = async (req, res, next) => {
  console.log(req.body);
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(403).json({
        success: false,
        status: "Утгуудаа бүрэн оруулна уу.",
        updated: 1,
        email: email,
        password: password,
      });
    } else {
      // Validate if user exist in our database
      const user = await users.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // user
        return res.status(200).json({
          success: true,
          status: "Амжилттай нэвтэрлээ.",
          data: user,
          token: token,
        });
      } else {
        return res.status(401).json({
          success: false,
          status: "Нууц үг нэр хоорондоо таарахгүй байна.",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

module.exports = { register, getRegister, login };
