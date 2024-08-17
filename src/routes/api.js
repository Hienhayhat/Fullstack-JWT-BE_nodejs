const express = require('express');
const { userControll, handleLogin, getUser, getAccount } = require('../controllers/userController');
const delay = require('../middleware/delay');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')


// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);
routerAPI.all('*',auth)

routerAPI.get('/',(req,res)=>{
    return res.status(200).json("hello")
})
routerAPI.post('/register',userControll)
routerAPI.post('/login',handleLogin)
routerAPI.get('/user',getUser)
routerAPI.get('/account',getAccount)


module.exports = routerAPI; //export default