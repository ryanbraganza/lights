const fs = require('fs');
const huejay = require('huejay');
const path = require('path');

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function findBridge() {
  const bridges = await huejay.discover();
  if (bridges.length < 1) {
    throw new Error('no bridges');
  }
  return bridges[0];
}

async function main() {
  const bridge = await findBridge();
  const client = new huejay.Client({
    host: bridge.ip,
  });

  console.log('press the button');
  const template = new client.users.User();
  template.deviceType = 'lights';
  let user = null;
  while (!user) {
    try {
      user = await client.users.create(template);
    } catch (error) {
      console.log('press the button ok?');
    }
  }

  const outputName = path.join(__dirname, '/config.json');

  fs.writeFileSync(
    outputName,
    JSON.stringify({USERNAME: user.username, BRIDGE_IP: bridge.ip}, undefined, 2)
  );

  console.log(`wrote file to ${outputName}`);
}

main();
