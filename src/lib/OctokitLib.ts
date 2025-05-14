import { Octokit } from '@octokit/rest';
import { githubToken } from '../config/config.js'; // 👈 Ensure `.js` is used if `"module": "ESNext"` or `"type": "module"`

export const octokit = new Octokit({
  auth: githubToken,
});
