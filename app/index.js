import http from 'http';
import redis from 'redis';

let redisCli = redis.createClient({
    socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
    }
});

redisCli.on('error', err => console.log('Redis Client Error', err));

async function getData() {
    await redisCli.connect();
    await redisCli.set('name', 'Gold');
    let response = await redisCli.get('name');
    await redisCli.quit();
    return response;    
}

let server = http.createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello: ' + await getData());
    res.end();
});

server.listen(process.env.APP_PORT);