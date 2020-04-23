module.exports = (req,res) => {

    req.header.cookie.destroy()
    return res.status(200).json('session logout')

}