import jwt from 'jsonwebtoken'

export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(400).json({message: 'no token given'})
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    }catch (error){
        return res.status(400).json({message: 'token is expired', error})
    }
}