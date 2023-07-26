import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralService, UserRequestDto } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-user-overlay',
  templateUrl: './add-user-overlay.component.html',
  styleUrls: ['./add-user-overlay.component.css']
})
export class AddUserOverlayComponent {
  modalVisible: boolean = true;
  user: UserRequestDto = new UserRequestDto
  
  @Output() updateUserOverlayVisibility = new EventEmitter<any>()

  constructor(private generalService: GeneralService, private http: HttpClient) {}
  
  addUser(form: any) {
    this.user.credentials.username = form.firstName + '.' + form.lastName;
    this.user.credentials.password = form.password;
    this.user.profile.firstName = form.firstName;
    this.user.profile.lastName = form.lastName;
    this.user.profile.email = form.email;
    this.user.profile.phone = form.phoneNumber;
    this.user.admin = form.userIsAdmin;

    let url = 'http://localhost:8080' + '/company/' + localStorage.getItem('companyId') +  '/user';
    this.http.post<UserRequestDto>(url, this.user).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  handleOverlayExit() {
    this.updateUserOverlayVisibility.emit()
  }
}
