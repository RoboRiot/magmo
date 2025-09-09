const { server } = require('next');
const nextApp = server({ dev: false, conf: { distDir: 'next' } });

module.exports = {
  nextServer: functions.https.onRequest((req, res) => {
    return nextApp.prepare().then(() => handle(req, res));
  }),
};
