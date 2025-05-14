import fs from 'fs/promises';
import {octokit} from './OctokitLib';
import { githubOrg } from '../config/config';


export const createAndPushRepo = async function(content:any, businessData:any) {
  const repoName = businessData.isUpdate ? businessData.repoName : `landing-${Date.now()}`;
  
  try {
    if (!businessData.isUpdate) {
      
      const { data: repo } = await octokit.repos.createInOrg({
        org: githubOrg ?? 'default-org',
        name: repoName,
        description: `Landing page for ${businessData.name}`,
        private: false,
        auto_init: true
      });

    }

    
    await octokit.repos.createOrUpdateFileContents({
      owner: githubOrg,
      repo: repoName,
      path: 'index.html',
      message: businessData.isUpdate ? 'Update landing page content' : 'Add landing page',
      content: Buffer.from(content).toString('base64'),
      ...(businessData.isUpdate && {
        sha: await getFileSha(repoName, 'index.html')
      })
    });

    
    return `https://github.com/${githubOrg}/${repoName}`;
  } catch (error) {
    throw error;
  }
};

async function getFileSha(repo: any, path: any) {
  const { data } = await octokit.repos.getContent({
    owner: githubOrg ?? 'default-org',
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