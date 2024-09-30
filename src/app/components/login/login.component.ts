import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CustomModalComponent } from '../../modals/custom-modal/custom-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';
import { Observer } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showForgotTab: any = false;
  wrongCred: any = false;
  email: any;
  wrongEmail: any = false
  showChangeFirstTimePassword: any = false;
  forgorPassword: any = false;
  confirmPassword: any = '';
  newPassword: any = '';
  currentPassword: any = '';
  error: string = '';
// email: any = ''

  constructor(private dialog: MatDialog, private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService) { }


  onForgotPassword(){
    this.forgorPassword = true;
  }

  onPasswordSent(){
    this.spinner.show();
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: 'Password Sent',
        message: 'Password has been sent to your registered email address.',
        buttonTextNo: 'Close',
      },
    });
    this.spinner.hide();
    this.forgorPassword = false;
  }

  onSendResentLink(emailForm: any): void {
    if (emailForm.invalid) {
      emailForm.controls.email.control.markAsTouched();
      return;
    }
    if (emailForm.valid) {
      const email = emailForm.value.email;

      this.loginService.sendResendLink(email)
        .then((response: any) => {
          if (response.body.reset_link === true) {
            const dialogRef = this.dialog.open(CustomModalComponent, {
              width: '35vw',
              disableClose: true,
              data: { icon: 'success.png', title: '', message: 'Mail sent successfully!', buttonTextYes: 'Ok' },
            });
            this.forgorPassword = false;
          } else {
            console.warn('Unexpected response:', response);
          }
        })
        .catch((error: number) => {
          if (error == 401) {
            const dialogRef = this.dialog.open(CustomModalComponent, {
              width: '35vw',
              disableClose: true,
              data: { icon: 'corrupted-file.png', title: '', message: 'Email does not exist.', buttonTextYes: 'Ok' },
            });
          }
        });
    } else {
      console.warn("Invalid email input");
    }
  }


  checkUserLoggedIn() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.email = email;
    } else {
      this.loginService.email$.subscribe((email) => {
        // console.log('email', email);
        this.email = email;
        sessionStorage.setItem('email', email);
      });
    }
    if(this.email !== ''){
      // console.log('this.email')
      // this.Router.navigate(['/overview']);
    }
  }

  async login(email: string, password: string): Promise<void> {
    let emailData: any = {
      email: email
    }
    try {
      const credentials = { email, password };
      if (!this.validateEmailFormat(email)) {
        this.wrongCred = true;
        return;
      }

      if (email === '' || password === '') {
        this.wrongCred = true;
        return;
      }
      try {
        const response: any = await this.loginService.login(credentials);
        console.log('response', response);
        if (response.body.login === true) {
          const firstTimeIndex = response.body.fields.indexOf("first_time");
          if (response.body.data[0][firstTimeIndex] === true) {
            this.showChangeFirstTimePassword = true;
            return;
          }
          sessionStorage.setItem('email', email);
          this.email = email;
          this.loginService.setEmail(email);
          // this.loginService.setRole(response.body.role);
          this.loginService.setSubscriptionId(response.body.subscription_id);
          const fullName = `${response.body.data[0][0]} ${response.body.data[0][1]}`; // f_name and l_name
          this.loginService.setName(fullName);
          this.loginService.set_f_name(response.body.data[0][0]);
          this.loginService.set_l_name(response.body.data[0][1]);
          this.loginService.setRole(response.body.data[0][2]);
          this.loginService.setuserId(response.body.data[0][3]); // employee_id
          // Check if first_time is true

          let role: any = sessionStorage.getItem('role')
          if(role == 'admin'){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/tabs']);
          }

          //
        } else {
          console.warn('Unexpected response:', response);
        }
      } catch (error: any) {
        console.error('Error during login:', error.error);

        if (error.status == 400 && error.error.helpText == 'Invalid Credentials') {
          this.wrongCred = true;
          const dialogRef = this.dialog.open(CustomModalComponent, {
            width: '35vw',
            disableClose: true,
            data: { icon: "info.png", title: '', message: 'Please enter correct credentials', buttonTextYes: 'Ok' },
          });
        }

        if (error.status == 400 && error.error.helpText === 'user already logged in') {
          const dialogRef = this.dialog.open(CustomModalComponent, {
            width: '35vw',
            disableClose: true,
            data: { icon: "info.png", title: '', message: 'You have already logged in from another device', buttonTextYes: 'Ok' },
          });
        }

        if (error.status === 401 || error.status === 422) {
          this.wrongCred = true;
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } catch (error) {
      if (error == 400 || error == 403) {
        this.wrongCred = true;
        return;
      }
    }
  }


  // signUp(username: string, password: string, email: string): void {
  //   const userData = { username, password, email };
  //   // this.loginService.signUp(userData).subscribe(observer);
  // }

  onShowForgotTabChange(value: boolean) {
    // console.log('value', value)
    this.showForgotTab = value;
  }

  onFirstTimePasswordChange(value: boolean){
   // console.log('value', value);
    this.wrongCred = false;
    this.showChangeFirstTimePassword = value;
  }

  validateEmailFormat(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.wrongEmail = !emailRegex.test(email);
}

async checkFirstLogin(email: any){
//   let emailData: any = {
//     email: email
//   }
//   try {
//     const response: any = await this.loginService.firstUserLoginCheck(emailData);
//     console.log(response?.status);
//     if (response?.status == 200  && response?.body && response.body?.first_user == true) {
//   }
// } catch (error) {
//   console.log('error', error)
//    if(error == 400 || error == 403){
//   this.wrongCred = true;
//   return;
//    }
//   }
 }

 forgotPassword(){
  // console.log('forgotPassword')
  // this.showForgotTab = true;
 }

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
        await this.login(this.email, this.confirmPassword);
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
}

