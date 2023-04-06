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

  /* async fetchNumberOfOrganizations(){ //This function will end up retrieveing all organizations, but not today at least. 
    const iterator = this.octokit.paginate.iterator("Get /organizations", {
      per_page: 100,
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    })
    console.log("iterator constructed");
    var totalNumber = 0; 
    for await (const { data: id } of iterator) {
      totalNumber += id.length;
      console.log(totalNumber);
    }
    return totalNumber;
  } */

}
