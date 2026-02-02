const ApiError = require('../exceptions/api-error');

module.exports = function(...roles){
    return function(req ,res , next){
        if(!req.user){
             return next(ApiError.UnauthorizedError());
        }
        if(!roles.includes(req.user.role)){
            return next(ApiError.ForbiddenError())
        } 
        next()
    }
} 