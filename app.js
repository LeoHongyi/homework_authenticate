const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')

const app = express()

exports.dbUser = [];
exports.dbRole = [];
exports.tokenList = new Set();

app.use(morgan('dev'))

app.use(express.json())

app.use(cors())


const PORT = process.env.PORT || 3000

// add router
app.use('/api', router)

// add middleware
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

exports.app = app
