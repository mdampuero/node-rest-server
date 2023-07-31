const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../controllers/database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000

        //Connect DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/users',require('../routes/user.routes'));
        this.app.use('/api/readings',require('../routes/readings.routes'));
        this.app.use('/api/auth',require('../routes/auth.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en ' + this.port);
        })
    }
}

module.exports = Server;