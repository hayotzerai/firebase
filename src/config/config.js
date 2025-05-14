import dotenv from 'dotenv'

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "developemnet";
export const TEST = process.env.NODE_ENV === "test";


export const SERVER_HOSTNAME  = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT  = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT): 3311;

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT
};

export const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

export const openaiConfig = {
    apiKey: process.env.OPENAI_API_KEY
};

export const githubToken = process.env.GITHUB_TOKEN || '';
export const githubOrg = process.env.LANDING_PAGE_REPO_NAME || '';
