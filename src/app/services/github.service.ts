import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private GITHUB_TOKEN: string;

  constructor(private http : HttpClient) { 
    this.GITHUB_TOKEN = "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";
  }

  fetchRepositoriesFromOrganization(organization: string){
    var link = 'https://api.github.com/orgs/'+organization+'/repos?Accept=application/vnd.github+json&Authorization='+this.GITHUB_TOKEN+'&X-GitHub-Api-Version=2022-11-28';
    return this.http.get(link);
  }

  fetchNumberOfOrganizations(){
    var aux = "https://api.github.com/organizations?Accept=application/vnd.github+json&Authorization="+this.GITHUB_TOKEN+"&X-GitHub-Api-Version=2022-11-28&per_page=100";
    return this.http.get(aux);
  }
}
