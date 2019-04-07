import { connect } from 'socket.io-client';

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;
  const chat = connect(`${url}chat`);
  const news = connect(`${url}news`);
  document.querySelector('button').addEventListener('click', () => {
    chat.emit('emit_from_client', {
      msg: (document.querySelector('#msg') as HTMLInputElement).value,
      room: (document.querySelector('#rooms') as HTMLSelectElement).value
    });
    (document.querySelector('#msg') as HTMLInputElement).value = '';
  });
  chat.on('emit_from_server', (data: string) => {
    const list = document.createElement('li');
    list.innerHTML = data;
    document.querySelector('#logs').appendChild(list);
  });
  news.on('emit_from_server', (data: string) => {
    document.querySelector('h1').innerHTML = data;
  });
});
