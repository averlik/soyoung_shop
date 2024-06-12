const ApiError=require('../error/ApiError')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {User,Cart,WishList}=require('../models/models')

const generateJwt=(id_user, email, role)=>{
    return jwt.sign(
        {id_user, email, role},
        process.env.SECRET_KEY ,
        {expiresIn:'24h'}
    )
}

class UserController{
    async signup(req,res,next){
        const{email, password_hash ,role}=req.body
        if(!email){
            return next(ApiError.badRequest('Некорректный email'))
        }
        else if(!password_hash){
            return next(ApiError.badRequest('Некорректный password'))
        }
        const candidate= await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword=await bcrypt.hash(password_hash,5)
        const user=await User.create({email,role,password_hash:hashPassword})
         // Используем await для создания корзины и списка желаемого
        await Cart.create({ id_user: user.id_user });
        await WishList.create({ id_user: user.id_user });
        const token=generateJwt(user.id_user, user.email, user.role)
        return res.json({token})
    }

    async login(req,res,next){
        const {email,password_hash}=req.body;
        const user= await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword=bcrypt.compareSync(password_hash, user.password_hash)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token=generateJwt(user.id_user, user.email, user.role)
        return res.json({token})
    }
    
    
    async check(req, res, next) {
        if(req){
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})}
        else return req.user.role
    }
}

module.exports=new UserController()
