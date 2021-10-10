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
app.use('/api', apiRoutes);
app.use(cors())

//Activar el cors
// Configurar cabeceras y cors
app.use( cors({ origin: true, credentials: true  }) );
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
