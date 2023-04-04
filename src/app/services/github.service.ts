import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Octokit } from '@octokit/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  //constructor(private http : HttpClient) { }
  constructor(private octokit: Octokit) { 
    octokit = new Octokit({
      auth: 'os.environ.get(GITHUB_TOKEN)' //Doesn't work properly because of the usage
    })
  }

  fetchRepositoriesFromOrganization(organization: string){
    const response = this.octokit.request('GET /orgs/{org}/repos', {
        org: organization,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }); 
    return response;   
  }
/* 
  listRepositoriesOfOrganization(organization: string){
      let response = this.fetchRepositoriesFromOrganization(organization);
  }
 */
  fetchNumberOfOrganizations(){
      const response = this.octokit.request('GET /organizations', {
          headers: {
              'X-GitHub-Api-Version': '2022-11-28'
          }
      });  
  }

/* 
  fetchLargestRepositoryFromOrganization(organization){
      
      const response = fetchRepositoriesFromOrganization(organization);
  } */

}
