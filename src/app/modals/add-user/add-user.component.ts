import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  userData: any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    this.userData = {
      org_name: "",
      role: "strategist",
      f_name: "",
      l_name: "",
      employee_id: "",
      email: "",
      admin_email: "",
      admin_password: "",
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    // console.log('close custom modal')
    this.dialogRef.close(true);
  }

  async addUser() {
    // console.log('this.userData', this.userData)

    if (this.userData.email !== '' && this.userData.role !== '' && this.userData.f_name !== '' && this.userData.l_name !== '' && this.userData.employee_id !== '') {
        try {

        } catch (error) {

            console.error('Error:', error);
            // this.closeModal = true;
            if (error === 400) {
              this.dialogRef.close(this.userData);
                // const dialogRef = this.dialog.open(CustomModalComponent, {
                //     width: '35vw',
                //     data: {icon: 'corrupted-file.png', title: '', message: 'User already exists!', buttonTextYes: 'Ok' },
                //   });
                //   this.hideAdminCredModal = true;
                //   this.hideAdminCredModalForToggleStatus = true;
                //   this.hideAddUserAdminCredModal = true;
            }
            else if (error === 401) {
                // const dialogRef = this.dialog.open(CustomModalComponent, {
                //     width: '35vw',
                //     data: {icon: 'corrupted-file.png', title: '', message: 'You cannot add more users!', buttonTextYes: 'Ok' },
                //   });
                //   this.hideAdminCredModal = true;
                //   this.hideAdminCredModalForToggleStatus = true
                //   this.hideAddUserAdminCredModal = true;
            }
            else {

                // Handle other errors here
                // const dialogRef = this.dialog.open(CustomModalComponent, {
                //     width: '35vw',
                //     data: {icon: 'corrupted-file.png',  title: '', message: 'An error occurred while creating the user. Please try again.', buttonTextYes: 'Ok' },
                //   });
                //   this.hideAdminCredModal = true;
                //   this.hideAdminCredModalForToggleStatus = true;
                //   this.hideAddUserAdminCredModal = true;
            }
        } finally {

            this.userData = {
                email: "",
                role: "",
                f_name: "",
                l_name: "",
                employee_id: "",
                admin_password: "",
                admin_email: ""
            }
            // this.hideAddModal = true;
        }
    } else {
        // const dialogRef = this.dialog.open(CustomModalComponent, {
        //     width: '35vw',
        //     data: {icon: 'corrupted-file.png',  title: '', message: 'Please fill all the details', buttonTextYes: 'Ok' },
        //   });

    }
}

onCloseAddUserModal(){
  this.dialogRef.close(false);
}
}
