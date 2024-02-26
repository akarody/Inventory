const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
    // optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
module.exports = corsConfig;