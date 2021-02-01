
// loading express 
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

const postRouter = require('./routes/postRouter')
const registerRouter = require('./routes/registerRouter')
const loginRouter = require('./routes/loginRouter')
const profileRouter = require('./routes/profileRouter')
const jobRouter = require('./routes/jobRouter')
const uploadRouter = require('./routes/uploadRouter')
const datasetRouter = require('./routes/datasetRouter')
const reportRouter = require('./routes/reportRouter')
const adminRouter = require('./routes/adminRouter')
const cashflowRouter = require('./routes/cashflowRouter')
const { checkUser } = require('./midddleware/authMiddleware')





// calling up the express() and adding bunch of functionalities to app
const app = express()

// setting up ejs as template engine
app.set('view engine', 'ejs')

// ********** Middlewares ************
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// ********** Routes ************
app.get('*', checkUser)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/post', postRouter)
app.use('/job', jobRouter)
app.use('/uploads', uploadRouter)
app.use('/datasets', datasetRouter)
app.use('/report', reportRouter)
app.use('/admin', adminRouter)
app.use('/cashflow', cashflowRouter)

module.exports = app

