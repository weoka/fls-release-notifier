const axios = require('axios');

module.exports = class GithubClient {
    async client(path)
    {
        try {
            const request_url = `https://api.github.com/${path}`;
            const request = await axios.get(request_url, {
                headers: {
                  Authorization: 'token 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'
                }
              });
            return request.data;
        }
        catch (e) {
            throw e;
        }
    }

    async getLatestRelease(repository)
    {
        const repositoryInfo = await this.client(`repos/${repository}/releases/latest`);
        return {
            tag: repositoryInfo['tag_name'],
            link: repositoryInfo['url'],
            name: repositoryInfo['name']
        };
    }
}




