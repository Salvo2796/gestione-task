module.exports = function errorHandler(err,req,res,next) {
    console.error("ERRORE: ", err);
    res.status(500).json({error: "INTERNAL SERVER ERROR"})
};