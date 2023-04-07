import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';

interface Repository{
  name: string;
  size: number;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  constructor(private github: GithubService){
    this.biggestRepository = {name: "", size: 0};
  }
  
  numberOfOrganizations: any;
  numberOfRepositories: any = -99;
  biggestRepository: Repository;

  ngOnInit(): void {
    this.setNumberOfOrganizations();
  }

  async setNumberOfOrganizations(){
    let response = await this.github.fetchNumberOfOrganizations();
    this.numberOfOrganizations = response.total_count;
  }

  async getNumberOfRepositories(organization: string) {
    if(typeof organization != 'undefined' && organization){ //It checks for "null", "undefined", "" and uninitialized.
      let response = await this.github.fetchRepositoriesFromOrganization(organization);
      this.numberOfRepositories = response.length;
    } else {
      alert("Organization not found");
    }
  }

  async getBiggestRepository(organization: string) {
    if(typeof organization != 'undefined' && organization){ //It checks for "null", "undefined", "" and uninitialized.
      var response:any = await this.github.fetchRepositoriesFromOrganization(organization);
      var propertiesChecked: number = 0;
      this.biggestRepository = {name: "placeholder", size: 0};
      var repository: Repository = {name: "placeholder", size: 0};
      //we need to iterate over the repositories, looking for the biggest one.
      // We save the first one we find, and then we continue iterating.
      //Once we find a repository, we compare if it's bigger than the one we saved.
      // If it's bigger, we save the new one and repeat the process.
      for(let entry of response){
        for(let prop in entry){
          if(prop === "name"){ 
            repository.name = entry[prop]; 
            propertiesChecked++;
          } else if(prop === "size"){
            repository.size = entry[prop];
            propertiesChecked++;
          }
          if(propertiesChecked === 2){
            propertiesChecked = 0;
            this.setBiggestRepository(repository);
            break;
          }
        }
      } 
    } else {
      alert("Organization not found");
    }
  }

  setBiggestRepository(repository: Repository){
    if(repository.size >= this.biggestRepository.size){
      console.log(repository);
      this.biggestRepository.name = repository.name;
      this.biggestRepository.size = repository.size;
    }
  }

}
