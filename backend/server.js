const express =  require('express')
const app = express()
require('./database')
const apiRoutes = require('./routes/apiRoutes');
const timeout = require('connect-timeout');
const cors = require('cors')

//Api
app.use(timeout('5s'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/api', apiRoutes);

if (env === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))
}

//Connect to PORT
//const PORT = process.env.PORT || 5000
// app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
app.listen(process.env.PORT || 3000)