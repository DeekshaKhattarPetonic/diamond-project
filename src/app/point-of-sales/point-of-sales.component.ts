import { ConfirmationModalComponent } from './../shared/confirmation-modal/confirmation-modal.component';
import { Component, Renderer2 } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../shared/custom-modal/custom-modal.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Import FormsModule
// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
// import ConfirmationModalComponent
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-point-of-sales',
  standalone: true,
  imports: [RadioButtonModule, FormsModule,
    CustomModalComponent,
    DialogModule,
    MatIconModule,
    DynamicDialogModule],
  templateUrl: './point-of-sales.component.html',
  styleUrl: './point-of-sales.component.scss',
  providers: [MessageService]
})
export class PointOfSalesComponent {
  ingredient!: string;

  constructor(private messageService: MessageService, private dialog: MatDialog, private renderer: Renderer2) {

  }

  openModal(){
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '35vw',
      data: {
        head: 'Congratulations',
        message: 'Confirmed',
      },
    });
  }

}
