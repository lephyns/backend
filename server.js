'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://petvax:petvax@petvaxcluster.hl6rk6u.mongodb.net/petvax?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (error) => {
    console.log('MongoDB error ' + error)
})

const userRoutes = require('./routes/user.routes')
const petRoutes = require('./routes/pet.routes')
const procedureRoutes = require('./routes/procedure.routes')

const server = Hapi.server({
    port: 3000,
    // host: 'localhost', //Apenas para acesso local
    host: '0.0.0.0', //Libera para acesso externo
    routes: {
        cors: {
            // origin: ['http://localhost:8080'] // Libera apenas para esta rota
            origin: ['*'] // Libera a porta 3000 para qualquer aplicação
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return { message: "Welcome to Petvax API" };
    }
});

server.route(userRoutes) //Adicionado a rota no servidor
server.route(petRoutes)
server.route(procedureRoutes)

server.start((err, h) => {
    if (err) {
        throw err;
    }
    console.log('Server running on %s', server.info.uri);
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

exports.init = async () => {
    return server;
}