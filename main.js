const Wrapper = require('./Wrapper');

const { USERNAME, BRIDGE_IP } = require('./config.json');

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function main() {
  const [,,...args] = process.argv;


  const bridge = {ip: BRIDGE_IP};
  const wrapper = new Wrapper(bridge, USERNAME);
  const lights = await wrapper.getAllLights();

  switch(args[0]) {
    case 'on':
      await wrapper.turnLightOn(lights[0]);
      break;
    case 'off':
      await wrapper.turnLightOff(lights[0]);
      break;
    default:
      throw new Error('Unexpected arg ', args[0]);
  }
}

main();
