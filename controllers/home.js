// exports an object with a single method called getIndex that, when called, renders an 'index.ejs' template as a response to an HTTP request.
module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    }
}