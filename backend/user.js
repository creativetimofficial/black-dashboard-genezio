import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import UserModel from "./models/users";
import ActiveSession from "./models/activeSession";
import { MONGO_DB_URI, secret, smtpConf } from "./config";
import reqAuth from "./middleware/reqAuth";
import nodemailer from "nodemailer";
export class User {
  constructor() {
    this.#connect();
  }

  // connect mongoose to mongodb
  #connect() {
    mongoose.set("strictQuery", false);
    try {
      mongoose.connect(MONGO_DB_URI);
    } catch (err) {
      console.log(err);
    }
  }

  // create a new user
  // change gender, phoneNumber, city and country to have default value undefined after GNZ-321 is resolved
  async create(
    name,
    email,
    password,
    userType,
    gender,
    phoneNumber,
    city,
    country
  ) {
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return { success: false, msg: "wrong email format" };
    }
    if (password.length < 8) {
      return { success: false, msg: "password is too short" };
    }
    if (
      phoneNumber &&
      !phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/im)
    ) {
      return { success: false, msg: "wrong phone number format" };
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return { success: false, msg: "Email already exists" };
    }
    const promise = new Promise((resolve, reject) => {
      bcrypt.genSalt(10, async function (err, salt) {
        if (err) {
          reject({ success: false, msg: "Error at genSalt", error: err });
        } else {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              reject({ success: false, msg: "Error at hash", error: err });
            } else {
              var err,
                newUser = await UserModel.create({
                  name: name,
                  email: email,
                  password: hash,
                  gender: gender,
                  phoneNumber: phoneNumber,
                  city: city,
                  country: country,
                  userType: userType,
                });
              if (err) {
                reject({
                  success: false,
                  msg: "Error at database",
                  error: err,
                });
              } else {
                var userId = newUser._id.toString();
                resolve({
                  success: true,
                  msg: "The user was succesfully registered",
                  userId: userId,
                });
              }
            }
          });
        }
      });
    });
    return promise;
  }

  // login
  async login(email, password) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return { success: false, msg: "Wrong credentials" };
    }
    const promise = new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, async function (err, res) {
        if (err) {
          reject({ success: false, msg: "Error at compare", error: err });
        } else {
          if (res) {
            const token = Jwt.sign(user.toJSON(), secret, {
              expiresIn: 86400, // 1 week
            });
            await ActiveSession.deleteMany({ userId: user._id });
            await ActiveSession.create({ token: token, userId: user._id });
            user.password = null;
            resolve({ success: true, user: user, token: token });
          } else {
            resolve({ success: false, msg: "incorrect user or password" });
          }
        }
      });
    });
    return promise;
  }

  // get a user by his token
  async getUserByToken(token) {
    const activeSession = await reqAuth(token);
    if (!activeSession.success) {
      return { success: false, msg: activeSession.msg };
    }

    const user = await UserModel.findById(activeSession.userId);

    if (!user) {
      return { success: false, msg: "user not logged in or not found" };
    }
    return { success: true, user: user };
  }

  // logout
  async logout(token) {
    try {
      await ActiveSession.deleteMany({ token: token });
      return { success: true };
    } catch (err) {
      return { success: false, msg: "error at logout", error: err };
    }
  }

  // update User
  async updateUser(token, updatedUser) {
    const sessionStatus = await this.getUserByToken(token);
    if (!sessionStatus.success) {
      return { success: false, msg: sessionStatus.msg };
    }
    const user = sessionStatus.user;
    if (!user) {
      return { success: false, msg: "user not found" };
    }

    const dataToSet = {};
    if (updatedUser.name != null) {
      dataToSet.name = updatedUser.name;
    }

    if (updatedUser.email != null) {
      if (!updatedUser.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return { success: false, msg: "fields validations error" };
      }
      dataToSet.email = updatedUser.email;
    }

    if (updatedUser.gender != null) {
      dataToSet.gender = updatedUser.gender;
    }

    if (updatedUser.phoneNumber != null) {
      if (
        !updatedUser.phoneNumber.match(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/im
        )
      ) {
        return { success: false, msg: "fields validations error" };
      }
      dataToSet.phoneNumber = phoneNumber;
    }

    if (updatedUser.city != null) {
      dataToSet.city = updatedUser.city;
    }

    if (updatedUser.country != null) {
      dataToSet.country = updatedUser.country;
    }

    const newValues = { $set: dataToSet };
    try {
      await UserModel.updateOne({ _id: user._id }, newValues);
      return { success: true, msg: "update completed" };
    } catch (err) {
      return { success: false, msg: "error at update", error: err };
    }
  }

  async sendForgotPasswordEmail(email) {
    const errors = [];
    if (!email) {
      errors.push({ msg: "Please enter all fields" });
    }
    const user = await UserModel.findOne({ email: email });
    if (user.length != 1) {
      errors.push({ msg: "Email Addres does not exist" });
    }
    if (errors.length > 0) {
      return { success: false, errors: errors };
    }
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(smtpConf);

    const query = { _id: user._id };
    const newValues = { $set: { resetPass: true } };
    await UserModel.updateOne(query, newValues);
    const response =  await transporter.sendMail({
      from: '"Your Company" <' + smtpConf.auth.user + ">", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      // eslint-disable-next-line max-len
      html:
        '<h1>Hey,</h1><br><p>If you want to reset your password, please click on the following link:</p><p><a href="' +
        "http://localhost:3000/auth/confirm-password/" +
        user._id +
        '">"' +
        "http://localhost:3000/auth/confirm-email/" +
        user._id +
        +'"</a><br><br>If you did not ask for it, please let us know immediately at <a href="mailto:' +
        smtpConf.auth.user +
        '">' +
        smtpConf.auth.user +
        "</a></p>", // html body
    });
    if(!response){
      return {succes : false}
    }
    return { success: true };
  }

  async resetPassword(userId, password) {
    const errors = [];
    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
      return { success: false, msg: errors };
    }
    try {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          throw err;
        } else {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              throw err;
            } else {
              password = hash;
              const newValues = {
                $set: { resetPass: false, password: password },
              };
              await UserModel.updateOne({ _id: userId }, newValues);
              return {
                success: true,
                msg: "The user succesfully changed his password",
                userId: userId,
              };
            }
          });
        }
      });
    } catch (err) {
      console.log("error at reset password", err);
    }
  }
}
