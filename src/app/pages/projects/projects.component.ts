import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Project } from '../../model/project';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }
}