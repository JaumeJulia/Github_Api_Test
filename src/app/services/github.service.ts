import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private octokit: Octokit = new Octokit({
    auth: "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"
  });

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
    const response = await this.octokit.request("GET /search/users?q=type:org", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    console.log(response);
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
