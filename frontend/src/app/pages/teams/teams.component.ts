import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDto, TeamDto } from '../../services/general.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: any[] = [];
  showOverlay: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.teams.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));

    let url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/teams';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((team: any) => {
          this.teams.push({
            id: team.id,
            name: team.name,
            members: team.teammates,
            projects: [],
          });

          let index: number = -1;
          let url =
            'http://localhost:8080/company/' +
            localStorage.getItem('companyId') +
            '/teams/' +
            team.id +
            '/projects';

          this.http.get<any>(url).subscribe({
            next: (data) => {
              for (let i = 0; i < this.teams.length; i++) {
                if (this.teams[i].id === team.id) {
                  index = i;
                  break;
                }
              }
              console.log(index);
              if (index != -1)
                this.teams[index].projects = JSON.parse(JSON.stringify(data));
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              // if (index != undefined) this.teams[index].projects = JSON.parse(this.teams[index].projects) as any[];
            },
          });
        });
        this.teams.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
        console.log(this.teams);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}
