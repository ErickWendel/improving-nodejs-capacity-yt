import http from 'http';

const processId = process.pid;
const server = http.createServer((req, res) => {

  // simulando uma tarefa pesada, que trava o event loop
  for (let index = 0; index < 1e7; index++);
  res.end(`handled by pid: ${processId}`);

});

server.listen(3000)
  .once('listening', () => {
    console.log(`Server Started in process ${processId}`);
  });

// Let's simulate Server Randomly Crashing using process.exit()
setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4);

process.on('SIGINT', () => {
  console.log('server ending', Date.now())
  server.close(() => process.exit())
})