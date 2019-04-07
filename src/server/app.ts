import * as express from 'express';
import { createServer } from 'http';
import { listen } from 'socket.io';

const app = express();
app.set('port', 1337);
app.use(express.static(`${__dirname}/../client/dist`));

const server = createServer(app);
const io = listen(server);

// io.sockets.on('connection', socket => {
const chat = io.of('/chat').on('connection', socket => {
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

const news = io.of('/news').on('connection', socket => {
  socket.emit('emit_from_server', `TODAY: ${new Date()}`);
});

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
