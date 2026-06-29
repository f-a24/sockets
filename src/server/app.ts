import { Server } from 'socket.io';
import { Hono } from 'hono';
import { createAdaptorServer } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import path from 'path';

const app = new Hono();

app.use('/*', serveStatic({ root: path.resolve(__dirname, '../client/dist') }));

const server = createAdaptorServer({ fetch: app.fetch });

server.listen(1337, () => {
  console.log('Hono server listening on port 1337');
});

const io = new Server();
io.attach(server);

// io.sockets.on('connection', socket => {
io.of('/chat').on('connection', socket => {
  socket.on('emit_from_client', (data: { msg: string; room: string }) => {
    // socket.client.id = data.name;
    // 接続しているソケットのみ
    // socket.emit('emit_from_server', `Hello from server: ${data}`);

    // 接続しているソケット以外全部
    // socket.broadcast.emit('emit_from_server', `Hello from server: ${data}`);

    // 接続しているソケット全部
    // io.sockets.emit(
    //   'emit_from_server',
    //   `id:${socket.client.id} => ${data.msg}`
    // );

    socket.join(data.room);
    socket.emit('emit_from_server', `you are in ${data.room}`);
    socket.broadcast.to(data.room).emit('emit_from_server', data.msg);
  });
});

// news
io.of('/news').on('connection', socket => {
  socket.emit('emit_from_server', `TODAY: ${new Date()}`);
});
