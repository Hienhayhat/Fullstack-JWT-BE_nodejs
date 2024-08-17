require("dotenv").config()
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { name } = require("ejs");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const createCustomerService = async (name, email, password) => {
    try {
        const UserExist = await User.findOne({ email: email });
        if (UserExist) {
            console.log("gmail đã tồn tại")
            return null
        } else {
            //hash user password
            const hashPassword = await bcrypt.hash(password, saltRounds);

            //post to database
            let result = await User.create({
                name: name,
                email: email,
                password: hashPassword,
                role: 'dev'
            })
            return result;
        }


    } catch (error) {
        console.log(error);
        return null;
    }
}
const getUserService = async () => {
    try {

        let result = await User.find({}).select('-password')
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const loginService = async (email, password) => {
    try {
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const checkPassword = await bcrypt.compareSync(password, userLogin.password);
            if (checkPassword) {
                const payload = {
                    email: userLogin.email,
                    name: userLogin.name
                }
                const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
                return {
                    accessToken: accessToken,
                    detail: { name: userLogin.name, email: userLogin.email },
                    EC: 0,
                    message: "đăng nhập thành công "
                }
            } else {

                return {
                    EC: 1,

                    message: "đăng nhập không hợp lệ "
                }
            }
        } else {
            return {
                EC: 2,
                message: 'đăng nhập không hợp lệ '
            }
        }




    } catch (error) {
        console.log(error);
        return null;
    }
}





module.exports = {
    createCustomerService, loginService, getUserService
}