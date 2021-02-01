const mongoose = require('mongoose')
const dotenv = require('dotenv')
// reads what ever is written in the config.env file and append it to the environment variable
dotenv.config({ path: './config.env' })

const app = require('./app')

// Connecting the local database with mongoose
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log("Connected To the DB..."))

// Starting up the server
const port = process.env.PORT

// the callback function will start executing as soon as the server will start
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})