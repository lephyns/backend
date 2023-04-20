'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://qaninja:qaninja@zaplinkcluster.fapnnxf.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
    // if (process.env.NODE_ENV === 'test') {
    //     mongoose.connection.db.dropDatabase();
    //     console.log('MongoDB test database dropped');
    // }
});

mongoose.connection.on('error', (error) => {
    console.log('MongoDB error ' + error)
})

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();