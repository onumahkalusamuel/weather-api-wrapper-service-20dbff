import Fastify from 'fastify'
import cors from '@fastify/cors';
import routes from "./routes.js";
import * as fastifyRedis from "@fastify/redis";
import * as fastifyStatic from '@fastify/static';
import * as path from 'path';
import {fileURLToPath} from 'url';

const fastify = Fastify();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

fastify.register(fastifyRedis, {host: process.env.REDIS_URL || '127.0.0.1', logLevel: 'fatal'});

await fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})

// static setup for the frontend assets
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'web/dist'),
    prefix: '/',
});

// routes
fastify.register(routes);

// Fallback to index.html for client-side routing
fastify.get('/', (req, reply) => {
    reply.sendFile('index.html');
});

// Run the server!
fastify.listen({port: 3000, host: "0.0.0.0"}, function (err) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
