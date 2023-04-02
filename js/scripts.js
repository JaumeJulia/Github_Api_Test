import { Octokit } from "octokit";
import { Os } from "os"; //Doesn't work properly

const os = new Os;

const octokit = new Octokit({
    auth: 'os.environ.get(GITHUB_TOKEN)' //Doesn't work properly because of the usage
})

async function fetchRepositoriesFromOrganization(organization){
    const response = await octokit.request('GET /orgs/{org}/repos', {
        org: organization,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }); 
    return response;   
}

async function listRepositoriesOfOrganization(organization){
    let response = fetchRepositoriesFromOrganization(organization);
}

async function fetchNumberOfOrganizations(){
    const response = await octokit.request('GET /organizations', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });  
}

async function fetchLargestRepositoryFromOrganization(organization){
    
    const response = fetchRepositoriesFromOrganization(organization);
}