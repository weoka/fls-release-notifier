const axios = require("axios");
const config = require("../config.json");

module.exports = class GithubClient {
  async client(path) {
    try {
      const request_url = `https://api.github.com/${path}`;
      const request = await axios.get(request_url, {
        headers: {
          Authorization: `token ${config.githubToken}`,
        },
      });
      return request.data;
    } catch (e) {
      throw e;
    }
  }

  async getLatestRelease(repository) {
    const repositoryInfo = await this.client(
      `repos/${repository}/releases/latest`
    );
    return {
      tag: repositoryInfo["tag_name"],
      link: repositoryInfo["url"],
      name: repositoryInfo["name"],
    };
  }
};
