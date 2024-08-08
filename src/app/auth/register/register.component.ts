import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent {
  registerSuccess() {
    Swal.fire('Success!', 'You have successfully registered an account.', 'success');
  }
  registerAlready() {
    Swal.fire('Error!', 'There is already this account in the system.', 'error');
  }
}
