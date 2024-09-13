import { Type, ViewChild, } from '@angular/core';
import { Component, AfterViewInit, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';

// import { LoginService } from '../../services/login.service';
// import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
// import { LoginService } from '../../services/login.service';
// import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../shared/custom-modal/custom-modal.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Import FormsModule

// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { SessionTimeoutService } from '../../services/session-timeout.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [DialogModule, DynamicDialogModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ToastModule, MatIconModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  providers: [MessageService]
})
export class UserManagementComponent implements AfterViewInit {
  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  counterValues = {
    webDesigning: 30,
    webDevelopment: 20,
    marketers: 10,
    executives: 8
  };
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
  initiators: any = [];
  contributors: any = [];
  approvers: any = [];
  projectManagers: any = [];
  messages: any = [];
  private webDesigningFinalValue = 1019;
  private webDevelopmentFinalValue = 962;

  constructor(private messageService: MessageService, private dialog: MatDialog, private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    this.animateCounters();
  }

  ngOnInit() {
    // this.sessionTimeoutService.checkUserInactivity();
    this.getAllUsers()
    this.userData = {
      email: "",
      role: "approver",
      f_name: "",
      l_name: "",
      employee_id: "",
      admin_email: "",
      admin_password: "",
    }

  }

  async addUser() {
    this.users.push(this.userData)
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: { icon: 'success.png', title: '', message: 'User created successfully! Password has been sent to the entered mail', buttonTextYes: 'Ok' },
    });
  }

  onEditUserDetails(user: any, index: any) {
    // console.log('user', user)
    this.editUserIndex = index
    this.hideEditModal = true;
    this.editUserDetails = JSON.parse(JSON.stringify(user));
    // console.log('editUserDetails',this.editUserDetails)
  }

  onCloseModal() {
    // console.log('close modal')
    this.editUserDetails = {}
    this.hideEditModal = false;
    // console.log('this.editUserDetails', this.editUserDetails)
  }

  onCloseAddUserModal() {
    this.hideAddModal = false;
    this.userData = {}
  }

  onCloseAdminModal() {
    // this.editUserDetails = {}
    this.hideAdminCredModal = false;
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

    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: { icon: 'success.png', title: '', message: 'User saved successfully!', buttonTextYes: 'Ok' },
    });

  }

  openAdminCredModal() {
    //console.log('Opening Admin Credentials Modal');
    // this.hideEditModal = true;
    this.hideAdminCredModal = true;
    // console.log('After opening:', this.hideEditModal, this.hideAdminCredModal);
  }

  openAdminCredModalToAdd() {
    this.hideEditModal = false;
    this.hideAddModal = false;
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: { icon: 'success.png', title: '', message: 'User saved successfully!', buttonTextYes: 'Ok' },
    });
  }


  onClickAddUser() {
    this.hideAddModal = true;
  }

  async getAllUsers() {
    this.filteredUsers = [
      {
        employee_id: '1234',
        org_name: 'Petonic Infotech',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'test@gmail.com',
        f_name: 'Deeksha',
        l_name: 'Khattar',
        role: 'Strategist',
        active: true,
      },
      {
        employee_id: '1234',
        org_name: 'Petonic Infotech',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'test@gmail.com',
        f_name: 'Deeksha',
        l_name: 'Khattar',
        role: 'Strategist',
        active: true,
      },
      {
        employee_id: '1234',
        org_name: 'Petonic Infotech',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'test@gmail.com',
        f_name: 'Deeksha',
        l_name: 'Khattar',
        role: 'Strategist',
        active: true,
      },
      {
        employee_id: '1234',
        org_name: 'Petonic Infotech',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'test@gmail.com',
        f_name: 'Deeksha',
        l_name: 'Khattar',
        role: 'Strategist',
        active: true,
      }
    ]
    // try {
    //     const response: any = await this.loginService.getAllUsers().toPromise();
    //    // console.log('response', response)
    //     // this.users = response;
    //     this.convertDataFormat(response)
    //     // this.dropdownDataKeys = this.getObjectKeys(this.dropdownData);
    //     // console.log('response', response);
    // } catch (error) {
    //     console.error('An error occurred:', error);
    // }
  }

  convertDataFormat(inputData: any) {

  }

  onToggleUserStatus(user: any) {

    let toggleText: any = ''
    if (user.active == true) {
      toggleText = 'activate'
    } else {
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

      // If the user clicked "Yes" in the modal
      if (result === 'Yes') {

        this.hideAdminCredModalForToggleStatus = true;
        this.selectedUser = user
      } else {
        user.active = !user.active
        this.hideAdminCredModalForToggleStatus = false
        //console.log('User canceled the action');

      }
    });
  }

  saveAdminCredModalForToggleStatus() {
    let data: any;
    data = {
      email: this.selectedUser.email,
      admin_email: this.admin_email,
      admin_password: this.admin_password
    }

    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: { icon: 'success.png', title: '', message: 'Status Changed!', buttonTextYes: 'Ok' },
    });

  }

  getProgressBarStyles(type: any): { [key: string]: string } {
    let percentage: any;
    let backgroundImage: any;
    if (type == 'user') {
      percentage = (this.activeUsers.length / this.users?.length) * 100;
      // console.log('percentage', percentage)
      backgroundImage = `conic-gradient(#2c63ff 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    if (type == 'initiator') {
      percentage = (this.initiators.length / this.users?.length) * 100;
      // console.log('percentage', percentage)
      backgroundImage = `conic-gradient(#6c757d 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    if (type == 'contributor') {
      percentage = (this.contributors.length / this.users?.length) * 100;
      // console.log('percentage', percentage)
      backgroundImage = `conic-gradient(#2597ae 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }
    if (type == 'approver') {
      percentage = (this.approvers.length / this.users?.length) * 100;
      // console.log('percentage', percentage)
      backgroundImage = `conic-gradient(#198754 0% ${percentage}%, #fafafa ${percentage}% 100%)`;
    }

    if (type == 'pm') {
      percentage = (this.projectManagers.length / this.users?.length) * 100;
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
    // this.fetchUserImages()
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


}
