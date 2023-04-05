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
    this.github.fetchNumberOfOrganizations().subscribe((response:any) => {
      this.numberOfOrganizations = response.length;
    }); 
  }

  getNumberOfRepositories(organization: string) {
    if(typeof organization != 'undefined' && organization){
      this.github.fetchRepositoriesFromOrganization(organization).subscribe((response:any) => {
        this.numberOfRepositories = response.length;
      });
    }
  }

  getBiggestRepository(organization: string) {
    if(typeof organization != 'undefined' && organization){
      this.github.fetchRepositoriesFromOrganization(organization).subscribe((response: any) => {
        var stringedResponse = JSON.stringify(response);
        var usableResponse = JSON.parse(stringedResponse);
        var propertiesChecked: number = 0;
        var repository: Repository = {name: "placeholder", size: 0};
        //we need to iterate over the repositories, looking for the biggest one.
        // We save the first one we find, and then we continue iterating.
        //Once we find a repository, we compare if it's bigger than the one we saved.
        // If it's bigger, we save the new one and repeat the process.
        for(let index in usableResponse){
          for(let prop in usableResponse[index]){
            if(prop === "name"){
              repository.name = usableResponse[index][prop];
              propertiesChecked++;
            } else if(prop === "size"){
              repository.size = usableResponse[index][prop];
              propertiesChecked++;
            }
            if(propertiesChecked === 2){
              propertiesChecked = 0;
              this.setBiggestRepository(repository);
              break;
            }
          }
        } 
      });
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
