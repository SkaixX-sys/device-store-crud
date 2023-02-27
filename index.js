const dotenv = require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHadnler = require('./middleware/ErrorFandingMiddleWare')
const path = require('path')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


//Обработка ошибок - последний Middleware
app.use(errorHadnler)



const port = process.env.port || 5000


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))

    } catch (e) {
console.log(e);
    }
}

start()