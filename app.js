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
// const ejs = require("ejs");

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({path: './config/.env'})

DBConnection();

const channelRoutes = require('./routes/channel')
const videoRoutes = require('./routes/videos')
const imgRoutes = require('./routes/img')
const userRoutes = require('./routes/user')
const feelingRoutes = require('./routes/feelings')
const subscriptionRoutes = require('./routes/subscriptions')
const bookmarkRoutes = require('./routes/bookmark')
const revenueRouters = require('./routes/revenue')


const app = express()


app.use(express.json())

app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File uploading
app.use(
    fileupload({
        createParentPath: true
    })
)

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100 // 100 request per 10 mins
// })

// app.use(limiter)

// Prevent http param pollution
app.use(hpp())

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 3600000}))


const versionOne = (routeName) => `/api/v1/${routeName}`

app.use(versionOne('channel'), channelRoutes)
app.use(versionOne('videos'), videoRoutes)
app.use(versionOne('img'), imgRoutes)
app.use(versionOne('user'), userRoutes)
app.use(versionOne('feelings'), feelingRoutes)
app.use(versionOne('subscriptions'), subscriptionRoutes)
app.use(versionOne('bookmarks'), bookmarkRoutes)
app.use(versionOne('revenue'), revenueRouters)

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
