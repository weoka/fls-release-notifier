const axios = require("axios");
const config = require("../config.json");

module.exports = class SlackClient {
  async send(data) {
    try {
      const hook_url = config.slack_hook;
      const request = await axios.post(hook_url, data);
      return request.data;
    } catch (e) {
      throw e;
    }
  }
  async pushRelease(data) {
    try {
      const message = {
        attachments: [
          {
            fallback: "New Release.",
            color: "#2eb886",
            pretext: "New wallet release!",
            title: data.releaseTitle,
            title_link: data.link,
            fields: [
              {
                title: "Coin",
                value: data.coin,
                short: false,
              },
              {
                title: "Version",
                value: data.version,
                short: false,
              },
            ],
          },
        ],
      };
      await this.send(message);
    } catch (e) {
      throw e;
    }
  }
  async sendMessage(msg) {
    try {
      const message = {
        text: msg,
      };
      await this.send(message);
    } catch (e) {
      throw e;
    }
  }
};
