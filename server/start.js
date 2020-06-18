const path = require('path');

const Koa = require('koa');
const koaStatic = require('koa-static');
const getPort = require('get-port');

async function runServer() {
    const port = await getPort({ port: 3000 });

    const app = new Koa();
    app.use(koaStatic(path.join(__dirname, '..', 'static')));
    app.listen(port);

    console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);