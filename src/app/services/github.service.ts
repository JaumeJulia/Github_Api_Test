import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private octokit: Octokit = new Octokit({  });

  constructor() {
    
  }

  async fetchRepositoriesFromOrganization(organization: string){
    const response = await this.octokit.paginate("GET /orgs/"+organization+"/repos", {
      per_page: 100,
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    return response;
  }

  async fetchNumberOfOrganizations(){
    const response = await this.octokit.request("GET /search/users", {
      q:"type:org",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    return response.data;
  }

 /*  async fetchNumberOfOrganizations(){
    const response = await this.octokit.request("GET /organizations", {
      per_page: 100,
      page: 500,
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    return response.data;
  }
} */
}
