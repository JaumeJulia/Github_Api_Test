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

  getNumberOfRepositories() {
    var numberOfRepositories;
    this.github.fetchRepositoriesFromOrganization("patata").subscribe((response:any) => {
      numberOfRepositories = response.length;
    });
  }

  getBiggestRepository() {
    this.github.fetchRepositoriesFromOrganization("patata").subscribe((response:any) => {
      
    });
  }
  }
