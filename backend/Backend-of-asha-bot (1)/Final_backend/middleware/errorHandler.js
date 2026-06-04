const errorHandler = (err, req, res, next) =>{
    const statusCode = err.statusCode || 500;

    console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Server Error',
        ...((process.env.NODE_ENV === 'development') && {stack: err.stack}),
        
    })
}


module.exports= errorHandler;
