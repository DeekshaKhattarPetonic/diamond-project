import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-review-changes',
  templateUrl: './review-changes.component.html',
  styleUrl: './review-changes.component.scss'
})
export class ReviewChangesComponent {
  date1: Date | undefined;
  date2: Date | undefined;
  showParams: any = false;
  selectedOption: any = null;

  constructor(
    public dialogRef: MatDialogRef<ReviewChangesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    // console.log('close custom modal')
    this.dialogRef.close(true);
  }
}
