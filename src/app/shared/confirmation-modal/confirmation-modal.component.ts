import { Component, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  head: any;
  icon: any
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  providers: [ { provide: MatDialogRef, useValue: {}},  { provide: MAT_DIALOG_DATA, useValue: {} },]
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
