import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-announcement-overlay',
  templateUrl: './create-announcement-overlay.component.html',
  styleUrls: ['./create-announcement-overlay.component.css'],
})
export class CreateAnnouncementOverlayComponent implements OnInit {
  // TODO, have to click new announcement twice to open
  isOpen: boolean = true;
  title: string = '';
  message: string = '';
  fail: boolean = false;
  success: boolean = false;
  submit: boolean = false;
  companyId: number = 0;
  user: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('companyId')!);
    if (companyId) this.companyId = companyId;
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) this.user = user;
  }

  post() {
    this.http
      .post(`http://localhost:8080/company/${this.companyId}/announcement`, {
        title: this.title,
        message: this.message,
        author: {
          id: this.user.id,
          profile: {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.phone,
          },
          admin: this.user.admin,
          active: this.user.active,
          status: this.user.status,
        },
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submit = true;
        },
        error: (e) => {
          console.log(e);
          this.fail = true;
          this.submit = true;
          setTimeout(() => {
            this.isOpen = false;
          }, 700);
        },
        complete: () => {
          (this.success = true),
            setTimeout(() => {
              this.isOpen = false;
            }, 700);
        },
      });
  }
}
