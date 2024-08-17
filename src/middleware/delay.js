const delay = (req, res, next) => {
    setTimeout(() => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) return res.send("No credentials");
            next()
        }else{
            res.send('error')
            next()
        }

    }, 3000);

}
module.exports = delay;