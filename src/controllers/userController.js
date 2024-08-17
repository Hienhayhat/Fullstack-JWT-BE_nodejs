const { createCustomerService,loginService, getUserService } = require("../services/customerService")

const userControll = async (req, res) => {
    const {name,email,password}=req.body
    const data=await createCustomerService(name,email,password)
    return res.status(200).json(data)
}
const handleLogin = async (req, res) => {
    const {email,password}=req.body
    const data=await loginService(email,password)
    return res.status(200).json(data)
}
const getUser = async (req, res) => {
    
    const data=await getUserService()
    
    
    return res.status(200).json(data)
}
const getAccount = async (req, res) => {
    
   
    
    
    return res.status(200).json(req.user)
}

module.exports = {
    userControll,handleLogin,getUser,getAccount

}