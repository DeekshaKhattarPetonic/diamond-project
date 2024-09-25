import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import {CustomModalComponent} from '../shared/custom-modal/custom-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,CommonModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  forgorPassword: any = false;

  constructor(private dialog: MatDialog,) {

  }


  onForgotPassword(){
    this.forgorPassword = true;


  }

  onPasswordSent(){
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: 'Password Sent',
        message: 'Password has been sent to your registered email address.',
        buttonTextNo: 'Close',
      },
    });
    this.forgorPassword = false;
  }
}
