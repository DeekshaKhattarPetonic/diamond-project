import { Type, ViewChild, } from '@angular/core';
import { Component, AfterViewInit, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';

// import { LoginService } from '../../services/login.service';
// import { MatDialog } from '@angular/material/dialog';
// import { LoginService } from '../../services/login.service';
// import { NotificationService } from '../../services/notification.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
// import { CustomModalComponent } from '../shared/custom-modal/custom-modal.component';
import { CustomModalComponent } from '../../modals/custom-modal/custom-modal.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { LoginService } from '../../services/login.service';
// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { SessionTimeoutService } from '../../services/session-timeout.service';
import { AddUserComponent } from '../../modals/add-user/add-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  providers: [MessageService]

})
export class UserManagementComponent {
  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  counterValues = {
    webDesigning: 30,
    webDevelopment: 20,
    marketers: 10,
    executives: 8
  };
  formToResetOnSave: NgForm | any;
  admin_email: any = '';
  toggleText: any = ''
  selectedUser: any = {};
  admin_password: any = '';
  // users: any[] = []; // Assuming users array is populated somewhere
  filteredUsers: any[] = [];
  roles: string[] = ['initiator', 'approver', 'contributor', 'admin', 'pm']; // List of available roles
  selectedRoles: string[] = [];
  activeUsers: any = [];
  inactiveUsers: any = [];
  inActiveUsers: any = [];
  userData: any;
  users: any = [];
  editUserDetails: any = {}
  hideAddUserAdminCredModal: any = false;
  hideAdminCredModalForToggleStatus: any = false;
  hideEditModal: any = false;
  hideAdminCredModal: any = false;
  hideAddModal: any = false;
  editUserIndex: any;
  @ViewChild('closebutton') closebutton!: ElementRef;
  closeModal = true;
  messages: any = [];
  private webDesigningFinalValue = 1019;
  private webDevelopmentFinalValue = 962;
  sales: any;
  strategists: any;
  pos: any;
  executives: any;

  constructor(private loginService: LoginService, private messageService: MessageService, private dialog: MatDialog, private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    this.animateCounters();
  }

  ngOnInit() {
    // this.sessionTimeoutService.checkUserInactivity();
    this.getAllUsers()
    this.userData = {
      org_name: "",
      role: "strategist",
      f_name: "",
      l_name: "",
      employee_id: "",
      email: "",
      // admin_email: "",
      // admin_password: "",
    }

  }


  async addUser() {
    // console.log('this.userData', this.userData)
    if (this.userData.email !== '' && this.userData.role !== '' && this.userData.f_name !== '' && this.userData.l_name !== '' && this.userData.employee_id !== '' && this.userData.org_name !== '') {
      try {
        this.hideAddUserAdminCredModal = false;
        const response: any = await this.loginService.signUp(this.userData);
        if (response?.body && response.body.user_creation == true) {
          if (response.status == 201 || response.status == 200) {
            // let validateResponse: any = await this.loginService.validateUser(this.userData);
            this.userData.user_active = true;
            this.users.push(this.userData);
            // if (validateResponse.status == 201 || validateResponse.status == 200) {

            // this.hideAddModal = true;
            // this.hideAddUserAdminCredModal = true;
            const dialogRef = this.dialog.open(CustomModalComponent, {
              width: '35vw',
              data: { icon: 'success.png', title: '', message: 'User created successfully! Password has been sent to the entered mail', buttonTextYes: 'Ok' },
            });
            // }
            // } else {
          }
          this.formToResetOnSave.resetForm()
        }
      } catch (error) {
        console.error('Error:', error);
        this.closeModal = true;
        if (error === 400) {
          const dialogRef = this.dialog.open(CustomModalComponent, {
            width: '35vw',
            data: { icon: 'corrupted-file.png', title: '', message: 'User already exists!', buttonTextYes: 'Ok' },
          });
          // this.hideAdminCredModal = true;
          // this.hideAdminCredModalForToggleStatus = true;
          // this.hideAddUserAdminCredModal = true;
        }
        else if (error === 401) {
          const dialogRef = this.dialog.open(CustomModalComponent, {
            width: '35vw',
            data: { icon: 'corrupted-file.png', title: '', message: 'You cannot add more users!', buttonTextYes: 'Ok' },
          });
          // this.hideAdminCredModal = true;
          // this.hideAdminCredModalForToggleStatus = true
          // this.hideAddUserAdminCredModal = true;
        }
        else {

          // Handle other errors here
          const dialogRef = this.dialog.open(CustomModalComponent, {
            width: '35vw',
            data: { icon: 'corrupted-file.png', title: '', message: 'An error occurred while creating the user. Please try again.', buttonTextYes: 'Ok' },
          });
          // this.hideAdminCredModal = true;
          // this.hideAdminCredModalForToggleStatus = true;
          // this.hideAddUserAdminCredModal = true;
        }
      } finally {

        this.userData = {
          email: "",
          role: "",
          f_name: "",
          l_name: "",
          employee_id: "",
          // admin_password: "",
          // admin_email: ""
        }
        this.hideAddModal = false;
      }
    } else {
      const dialogRef = this.dialog.open(CustomModalComponent, {
        width: '35vw',
        data: { icon: 'corrupted-file.png', title: '', message: 'Please fill all the details', buttonTextYes: 'Ok' },
      });

    }
  }

  onEditUserDetails(user: any, index: any) {
    // console.log('user', user)
    this.editUserIndex = index
    this.hideEditModal = true;
    console.log('hideEditModal', this.hideEditModal)
    this.editUserDetails = JSON.parse(JSON.stringify(user));
    // console.log('editUserDetails',this.editUserDetails)
  }

  onCloseModal(form: NgForm) {
    // console.log('close modal')
    this.editUserDetails = {}
    this.hideEditModal = false;
    form.resetForm()
    // console.log('this.editUserDetails', this.editUserDetails)
  }

  onCloseAddUserModal(form: NgForm) {
    this.hideAddModal = false;
    this.userData = {}
    form.resetForm()
  }

  onCloseAdminModal() {
    // this.editUserDetails = {}
    this.hideAdminCredModal = true;
  }

  onCloseAddUserAdminModal() {
    this.hideAddUserAdminCredModal = false;
  }

  onCloseToggleStatusAdminModal() {
    this.hideAdminCredModal = false;
    this.hideAddUserAdminCredModal = false;
    this.hideAddModal = false;
    this.hideAdminCredModalForToggleStatus = false;
  }

  onSaveEditUserDetails() {
    // console.log('(this.editUserDetails', this.editUserDetails)

    // this.editUserDetails['admin_email'] = 'jitendra.nayak@petonic.in';
    // this.editUserDetails['admin_password'] = 'LOZ38tLl';

    this.loginService.onSaveEditUser(this.editUserDetails).subscribe(
      (response) => {
        this.hideEditModal = false;
        this.hideAdminCredModal = false;
        // Handle the response data here
        // console.log('Response:', response);
        // console.log('response.update', response.update)
        if (response.update == true) {
          // console.log('true')
          // console.log('editUserIndex', this.editUserIndex)
          this.users[this.editUserIndex] = this.editUserDetails
          // console.log(this.closebutton)
          let closeBtn: any = this.closebutton?.nativeElement;
          // console.log('closeBtn', closeBtn)
          closeBtn?.nativeElement?.click();


          const dialogRef = this.dialog.open(CustomModalComponent, {
            width: '35vw',
            data: { icon: 'success.png', title: '', message: 'User saved successfully!', buttonTextYes: 'Ok' },
          });

          this.formToResetOnSave.resetForm();


          // this.users.push(this.userData)editUserDetails
          // console.log('this.users', this.users)
        }
      },
      (error) => {

        // Handle errors
        // const dialogRef = this.dialog.open(CustomModalComponent, {
        //     width: '35vw',
        //     data: {icon: 'corrupted-file.png',  title: '', message: 'Please enter correct credentials', buttonTextYes: 'Ok' },
        //   });
        // console.error('Error:', error);
      }
    );
  }

  openAdminCredModal(form: NgForm) {
    if (form.invalid) {
      console.log('invalid')
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
    this.formToResetOnSave = form;
    this.onSaveEditUserDetails()
    //console.log('Opening Admin Credentials Modal');
    // this.hideEditModal = true;
    // this.hideAdminCredModal = true;
    // console.log('After opening:', this.hideEditModal, this.hideAdminCredModal);
  }

  openAdminCredModalToAdd(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
    this.formToResetOnSave = form;
    this.hideAddUserAdminCredModal = true;

    //console.log('After opening:', this.hideEditModal, this.hideAdminCredModal);
  }

  onClickAddUser() {
    this.hideAddModal = true;
    console.log('hideAddModal', this.hideAddModal)
    //   const dialogRef = this.dialog.open(AddUserComponent, {
    //     width: '35vw',
    //     data: {
    //         // head: `${toggleText} user`,
    //         // icon: toggleText == 'activate' ? 'activate' : 'deactivate',
    //         // message: `Do you want to ${toggleText} the user?`,
    //     },
    // });
  }

  async getAllUsers() {
    try {
      const response: any = await this.loginService.getAllUsers().toPromise();
      // console.log('response', response)
      // this.users = response;
      this.convertDataFormat(response)
      // this.dropdownDataKeys = this.getObjectKeys(this.dropdownData);
      // console.log('response', response);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

convertDataFormat(inputData: any) {
    // console.log('inputData', inputData)
    const { data, fields } = inputData;
    const result: any = [];
    // console.log('data', data)
    // console.log('fields', fields)
    this.activeUsers = [];
    this.users = [];
  this.sales = [];
  this.strategists = [];
  this.pos = [];
  this.executives = [];
  this.inActiveUsers = []
  // console.log('data', data)
  data.forEach((item: any) => {
    const convertedObject: any = {};
    item.forEach((value: any, index: any) => {
      convertedObject[fields[index]] = value;
    });
    this.users.push(convertedObject);
    if (convertedObject.hasOwnProperty('active') && convertedObject.user_active === true) {
      this.activeUsers.push(convertedObject);
    }
    if (convertedObject.hasOwnProperty('role') && convertedObject.role === 'sales') {
      this.sales.push(convertedObject);
    }
    if (convertedObject.hasOwnProperty('role') && convertedObject.role === 'strategist') {
      this.strategists.push(convertedObject);
    }
    if (convertedObject.hasOwnProperty('role') && convertedObject.role === 'pos') {
      this.pos.push(convertedObject);
    }
    if (convertedObject.hasOwnProperty('role') && convertedObject.role === 'executive') {
      this.executives.push(convertedObject);
    }
    if (convertedObject.hasOwnProperty('active') && convertedObject.user_active === false) {
      this.inActiveUsers.push(convertedObject);
    }
  });
  // console.log('this.users', this.users)
  this.filteredUsers = this.users;
  return this.users;
}

onToggleUserStatus(user: any) {
    let toggleText : any = ''
    if(user.user_active == true){
        toggleText = 'activate'
    } else{
        toggleText = 'deactivate'
    }
    this.toggleText = toggleText
    // console.log('useractive', user.active)
    // Open a confirmation modal
    // const dialogRef = this.dialog.open(ConfirmationModalComponent, {
    //     data: {
    //         message: `Do you want to ${toggleText} the user?`,
    //     },
    // });
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '35vw',
        data: {
            head: `${toggleText} user`,
            icon: toggleText == 'activate' ? 'activate' : 'deactivate',
        message: `Do you want to ${toggleText} the user?`,
      },
    });

  // Subscribe to the dialog result
  dialogRef.afterClosed().subscribe(result => {
    console.log('result', result)
    // If the user clicked "Yes" in the modal
    if (result === true) {
      this.selectedUser = user
      this.saveAdminCredModalForToggleStatus()
      // this.hideAdminCredModalForToggleStatus = false;

      console.log('this.selectedUser ', this.selectedUser )
    } else {
      user.user_active = !user.user_active
      this.onCloseToggleStatusAdminModal()
  // this.hideAdminCredModalForToggleStatus = true
            //console.log('User canceled the action');

        }
    });
}

  saveAdminCredModalForToggleStatus() {
    let data: any;
    data = {
      email: this.selectedUser.email,
      admin_email: 'jitendra.nayak@petonic.in',
      admin_password: 'vSv4TUcm'
    }

    console.log('data', data)
    this.loginService.changeUserActiveStatus(data).subscribe(
      async (response) => {

        console.log('response', response)
        const dialogRef = this.dialog.open(CustomModalComponent, {
          width: '35vw',
          data: { icon: 'success.png', title: '', message: 'Status Changed!', buttonTextYes: 'Ok' },
        });
        this.hideAdminCredModal = false;
        this.hideAddUserAdminCredModal = false;
        this.hideAddModal = false;
        this.hideAdminCredModalForToggleStatus = false;
        let notificationMessage: any = `status changed to ${this.toggleText}d of ${this.selectedUser.f_name}`
        // this.notificationService.sendMessageNotif(notificationMessage);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: notificationMessage });
        //console.log('Mail sent successfully. Response:', response);
        await this.getAllUsers()
        //console.log('response', response);
      },
      (error) => {

        console.error('Error:', error);
      }

    );
  }

getProgressBarStyles(type: any): { [key: string]: string } {
    let percentage: any;
    let backgroundImage: any;
    if (type == 'user') {
        percentage = (this.activeUsers.length / this.users?.length) * 100;
        // console.log('percentage', percentage)
        backgroundImage = `conic-gradient(#2c63ff 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    if (type == 'sales') {
        percentage = (this.sales.length / this.users?.length) * 100;
        // console.log('percentage', percentage)
        backgroundImage = `conic-gradient(#6c757d 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    if (type == 'contributor') {
        percentage = (this.executives.length / this.users?.length) * 100;
        // console.log('percentage', percentage)
        backgroundImage = `conic-gradient(#2597ae 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    if (type == 'approver') {
        percentage = (this.pos.length / this.users?.length) * 100;
        // console.log('percentage', percentage)
        backgroundImage = `conic-gradient(#198754 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }

    if (type == 'pm') {
        percentage = (this.executives.length / this.users?.length) * 100;
        // console.log('percentage', percentage)
        backgroundImage = `conic-gradient(#198754 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    return {
        'background-image': backgroundImage,
        'width': '80px', // Adjust the width according to your design
        'height': '80px', // Adjust the height according to your design
    };
}

toggleRoleFilter(role: string, event: any) {
    const isChecked = event.target.checked;
    // Rest of your logic remains the same
    if (isChecked) {
        this.selectedRoles.push(role);
    } else {
        this.selectedRoles = this.selectedRoles.filter(r => r !== role);
    }
    // this.applyRoleFilter();
}

selectAllRoles(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
        this.selectedRoles = [...this.roles]; // Select all roles
    } else {
        this.selectedRoles = []; // Deselect all roles
    }
    this.applyRoleFilter();
}


applyRoleFilter() {
    if (this.selectedRoles.length === 0) {
        this.filteredUsers = this.users; // If no roles selected, show all users
    } else {
        this.filteredUsers = this.users.filter((user: any) => this.selectedRoles.includes(user.role));
    }

}

// applyRoleFilter() {

// }

toggleSelectAllRoles(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
        this.selectedRoles = [...this.roles]; // Select all roles
    } else {
        this.selectedRoles = []; // Deselect all roles
    }
    // Check/uncheck individual role checkboxes
    this.roles.forEach(role => {
        const roleCheckbox = document.getElementById(role) as HTMLInputElement;
        roleCheckbox.checked = isChecked;
    });
}



  private animateCounters() {
    this.counters.forEach(counter => {
      const element = counter.nativeElement;
      const finalValue = parseInt(element.getAttribute('data-final-value') || '0', 10);
      this.animateCounter(element, finalValue);
    });
  }

  private animateCounter(element: HTMLElement, finalValue: number) {
    let start = 0;
    const end = finalValue;
    const duration = 900;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      this.renderer.setProperty(element, 'innerText', start.toString());
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  async goBack() {
    // await this.ContributorService.setSelectedChallenge(this.selectedCh);
    // this.Router.navigate(['/contributor-list']);
    window.history.back();
}

}

