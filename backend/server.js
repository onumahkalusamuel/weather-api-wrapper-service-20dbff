import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify'
import cors from '@fastify/cors';
import routes from "./routes.js";
import * as fastifyRedis from "@fastify/redis";
import * as fastifyStatic from '@fastify/static';
import * as fastifyEnv from "@fastify/env";
import * as path from 'path';
import {fileURLToPath} from 'url';

const fastify = Fastify();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const schema = {
    type: 'object',
    required: ['PORT', 'WEATHER_API_KEY'],
    properties: {
        PORT: {type: 'number', default: 3000},
        WEATHER_API_KEY: {type: 'string'},
        REDIS_HOST: {type: 'string'}
    }
}

await fastify.register(fastifyEnv, {schema: schema});

fastify.register(fastifyRedis, {host: process.env.REDIS_HOST || '127.0.0.1', logLevel: 'fatal'});

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
