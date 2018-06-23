const huejay = require('huejay');

class Wrapper {
  constructor(bridge, username) {
    this.client = new huejay.Client({
      host: bridge.ip,
      timeout: 15000,
      username: username,
    });
  }

  async getAllUsers() {
    return await this.client.users.getAll();
  }

  async deleteUser(username) {
    return await this.client.users.delete(username);
  }

  async bridgePing() {
    return await this.client.bridge.ping();
  }

  async getAllLights() {
    return await this.client.lights.getAll();
  }

  async turnLightOn(light) {
    light.on = true;
    return await this.client.lights.save(light);
  }
  async turnLightOff(light) {
    light.on = false;
    return await this.client.lights.save(light);
  }
}

module.exports = Wrapper;
