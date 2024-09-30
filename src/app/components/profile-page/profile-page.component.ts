import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../../modals/custom-modal/custom-modal.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  wrongCred: any = false;
  activeTab: any = 1;
  forgorPassword: any = false;
  confirmPassword: any = '';
  newPassword: any = '';
  currentPassword: any = '';
  error: string = '';
email: any = ''

constructor(private loginService: LoginService,private dialog: MatDialog,) { }

 reset() {
  this.confirmPassword = '';
  this.newPassword = '';
  this.currentPassword = ''
  this.error = '';
}


async updatePassword() {
  // this.spinner.show()
  if (this.newPassword !== this.confirmPassword) {
    this.error = 'New password and confirm password do not match.';
    // this.spinner.hide()
  } else {
    this.error = '';

    try {
      // this.spinner.show()
      this.email = sessionStorage.getItem('email');
      // console.log(this.email);
      let data: any = {
        email: this.email,
        current_password: this.currentPassword,
        new_password: this.newPassword
      };

      let response: any = await this.loginService.changePassword(data);

      // console.log('response', response.status);

      if (response.body.reset == true) {
        // this.FirstTimePasswordChange.emit(false);

        const notificationMessage = 'Password Changed!';
        // this.notificationService.sendMessageNotif(notificationMessage);
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: notificationMessage });
        // alert("Password Changed Successfully!!");

        await this.onFlipUserStatus();
        this.onPasswordSent()
        // await this.login(this.email, this.confirmPassword);
        // this.spinner.hide()
      }
    } catch (error) {
      // alert(error)
      // this.spinner.hide()
      if (error == 401) {
        // this.spinner.hide();
        this.error = 'please enter correct password'
        // const dialogRef = this.dialog.open(CustomModalComponent, {
        //   width: '35vw',

        //   disableClose: true,
        //   data: {icon: 'corrupted-file.png', title: '', message: 'please enter correct password', buttonTextYes: 'Ok' },
        // });
        // alert('please enter correct password')
      }
    }
  }

}

async onFlipUserStatus(){
  let data : any = {
    email : this.email
  }
  try {
    const response: any = await this.loginService.flipUserStatus(data);
    //console.log(response?.status);
    // console.log('Response:', response);
    if (response?.body && response.body.flip == true) {
  }
} catch (error) {
 // console.log('error', error)
}

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
