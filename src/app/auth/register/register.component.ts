import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent {
  loginObj: Register;

  constructor(private http: HttpClient) {
    this.loginObj = new Register();
  }

  onRegister() {
    this.http.post('https://test1.xn--12cgj3ga1lya4d6c.xn--o3cw4h/apis/auth/register', this.loginObj).subscribe((res: any) => {
      if (res.result) {
        this.registerSuccess
      } else {
        alert(res.message)
      }
    })
  }

  registerSuccess() {
    Swal.fire('Success!', 'You have successfully registered an account.', 'success');
  }
  registerAlready() {
    Swal.fire('Error!', 'There is already this account in the system.', 'error');
  }
}

export class Register {
  username: string;
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
}