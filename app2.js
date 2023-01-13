const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const fileupload = require('express-fileupload')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({path: './config/.env2'})

DBConnection();

const chainRoutes = require('./routes/chain')

const app = express()

app.use(express.json())

app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())


// Prevent http param pollution
app.use(hpp())

app.set('view engine', 'ejs');

const versionOne = (routeName) => `/api/v1/${routeName}`

app.use(versionOne('chain'), chainRoutes)

app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(
        `We are live on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    server.close(() => process.exit(1))
})
