require('dotenv').config()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const {alertMove} = require('./alert.js')
 
const cookieExtractor = function (req) {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token;
}

const opts = {}
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = process.env.secretKey

const verifyUser = (jwt_payload, done) => {
    try {
        const {userid} = jwt_payload
        console.log(jwt_payload)
        if (userid) {
            return done(null, jwt_payload)
        } else {
            return done(null, false)
        }
    } catch(err) {
        console.log(err)
        return done(err, false)
    }
}

const passportConfig = (passport) => {
    passport.use(new JwtStrategy(opts, verifyUser))
}

const auth = (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
        if (err) {
            return next(err)
        }
        if (!user) {
            console.log(info.message)
            return res.send(info.message)
            // return res.send(alertMove(`${info.message}`, '/user/login'))
        }
        req.user = user
        return next()
    })(req, res, next)
}

// module.exports = passport => {
//     passport.use(new JwtStrategy(opts, verifyUser))
// }

module.exports = {
    passportConfig,
    auth
}