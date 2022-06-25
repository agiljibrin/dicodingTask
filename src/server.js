const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        // menerapkan aturan CORS
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes)

    await server.start();
    console.log(`Server Sedang Berjalan di ${server.info.uri}`)
};

init();