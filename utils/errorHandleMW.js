const AppExceptions = require("./AppExceptions")

const handleCastErrorDB = (err)=>{
    return new AppExceptions(`Invalid ${err.path} with the value of { ${err.value} } `,400);
}
const handleDuplicateErrorDB = (err)=>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppExceptions(`Duplicate field value: ${value} . Please use another value`,400);
}
const handleValidationErrorDB = (err)=>{
    const errors = Object.values(err.errors).map((item) => 
        item.message
    )
    return new AppExceptions(`Invalid input data ${errors.join(". ")}`,400);
}
const sendErrorDev = (err, res) => {
    if(err.isOperational){
       return res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            error:err,
            stack:err.stack
        });
    }
    else{
        return res.status(500).json({
            status:"Error",
            message:err
        });
    }
}
const sendErrorProd = (err,res)=>{
    //Operational, trusted error: send message to a client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        });
    }
    else{
        //Programming error or other unknown error
        res.status(500).json({
            status:"Error",
            message:"Something went very wrong!!!!"+`{${err}}`
        }); 
    }
    
}
module.exports = (err,req,res,next)=>{3
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    if(process.env.Node_ENV == "development"){
        sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV == "production"){
       let error;
        error = err;
        if(err.name == "CastError"){
           error = handleCastErrorDB(err);
        }
        if(err.code == 11000){
            error = handleDuplicateErrorDB(err);
        }
        if(err.name == "ValidationError"){
            error = handleValidationErrorDB(err);
        }
        sendErrorProd(error,res);
    }

    
}