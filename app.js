const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// app use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 8000;

// Import DB
require("./db/connection");
//Import File
const Users = require("./modles/Users");

// route.....
app.get("/", (req, res) => {
  res.end("Welcome");
});

// register.................................
app.post("/api/register", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(200).send("Plese all require files");
    } else {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User alredy Exist");
      } else {
        const newUser = new Users({ fullName, email });
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("user register Successfully");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

// Lohin..........................
app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Plese all require files");
    } else {
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(400).send("User Email & Password is Incorrect");
      } else {
        const valideteUser = await bcryptjs.compare(password, user.password);
        if (!valideteUser) {
          res.status(400).send("User Email & Password is Incorrect");
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";
          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 86400 },
            async (err, token) => {
              await Users.updateOne({ _id: user._id }, { $set: { token } });
              user.save();
              res.status(200).json({
                user: {
                  id: user._id,
                  email: user.email,
                  password: user.password,
                  fullName: user.fullName,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

app.listen(port, () => {
  console.log("listing on Port" + port);
});
