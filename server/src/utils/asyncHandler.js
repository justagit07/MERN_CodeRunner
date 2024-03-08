const asyncHandler = function (fn)
{
    return async(req,res,next)=>
    {
        try{
            await fn(req,res,next)

        }
        catch(err)
        {
             res.status(err.code || 400).json(
             {
                success:false,
                message:err.message
             }
             )
        }
    }
}

export default asyncHandler