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
    this.biggestRepository = {name: "placeholder", size: 0};
  }
  
  numberOfOrganizations: any;
  numberOfRepositories: any = 0;
  biggestRepository: Repository;

  ngOnInit(): void {
    this.github.fetchNumberOfOrganizations().subscribe((response:any) => {
      this.numberOfOrganizations = response.length;
    }); 
  }

  getNumberOfRepositories(organization: string) {
    var numberOfRepositories;
    this.github.fetchRepositoriesFromOrganization(organization).subscribe((response:any) => {
      numberOfRepositories = response.length;
    });
  }

  getBiggestRepository(organization: string) {
    this.github.fetchRepositoriesFromOrganization(organization).subscribe((response:any) => {
      //we need to iterate over the repositories, looking for the biggest one. We save the first one we find, and then we continue iterating.
      //Once we find a repository, we compare if it's bigger than the one we saved. If it's bigger, we save the new one and repeat the process.
    });
  }
  }
