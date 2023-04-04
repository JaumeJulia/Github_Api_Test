import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  constructor(private github: GithubService){}
  numberOfOrganizations: any;

  ngOnInit(): void {
    this.github.fetchNumberOfOrganizations().subscribe((response:any) => {
      this.numberOfOrganizations = response.length;
    }); 
  }
}
