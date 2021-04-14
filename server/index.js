const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const apiRouter = require('./routes/apiRouter');
const config = require('./config');

// Multi-process to utilize all CPU cores.
if (!config.isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  
  // Serve API path
  app.use('/api', apiRouter);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(config.port, function () {
    console.error(`Node ${config.isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${config.port}`);
  });
}
