"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndPushRepo = void 0;
const OctokitLib_1 = require("./OctokitLib");
const config_1 = require("../config/config");
const createAndPushRepo = async function (content, businessData) {
    const repoName = businessData.isUpdate ? businessData.repoName : `landing-${Date.now()}`;
    try {
        if (!businessData.isUpdate) {
            const { data: repo } = await OctokitLib_1.octokit.repos.createInOrg({
                org: config_1.githubOrg ?? 'default-org',
                name: repoName,
                description: `Landing page for ${businessData.name}`,
                private: false,
                auto_init: true
            });
        }
        await OctokitLib_1.octokit.repos.createOrUpdateFileContents({
            owner: config_1.githubOrg,
            repo: repoName,
            path: 'index.html',
            message: businessData.isUpdate ? 'Update landing page content' : 'Add landing page',
            content: Buffer.from(content).toString('base64'),
            ...(businessData.isUpdate && {
                sha: await getFileSha(repoName, 'index.html')
            })
        });
        return `https://github.com/${config_1.githubOrg}/${repoName}`;
    }
    catch (error) {
        throw error;
    }
};
exports.createAndPushRepo = createAndPushRepo;
async function getFileSha(repo, path) {
    const { data } = await OctokitLib_1.octokit.repos.getContent({
        owner: config_1.githubOrg ?? 'default-org',
        repo: repo,
        path: path
    });
    // Ensure `data` is an object and has a `sha` property
    if (Array.isArray(data)) {
        throw new Error(`Path "${path}" is a directory, not a file.`);
    }
    if (!data.sha) {
        throw new Error(`SHA not found for the file at path "${path}".`);
    }
    return data.sha;
}
