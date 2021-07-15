const projectsFile = require("./projects/projects.json");
const GithubClient = new (require("./GithubClient"))();
const SlackClient = new (require("./SlackClient"))();
const JsonHandler = new (require("./JsonHandler"))();

const projects = projectsFile.projects;

const updateWallets = async () => {
  for (const project of projects) {
    try {
      const release = await GithubClient.getLatestRelease(
        project.repositoryPath
      );

      //notify if release is different that latest
      if (release["tag"] != project.latestRelease && release["tag"].length) {
        const SlackData = {
          coin: project.name,
          link: release.link,
          releaseTitle: release.name,
          version: release.tag,
        };

        await SlackClient.pushRelease(SlackData);
      }

      //update release
      if (release["tag"] != project.latestRelease) {
        project.latestRelease = release["tag"];
        JsonHandler.saveJson({ projects: projects });
      }
    } catch (e) {
      SlackClient.sendMessage(
        `There was an error trying to fetch the last release from ${project.name}.`
      );
    }
  }
};

updateWallets();
