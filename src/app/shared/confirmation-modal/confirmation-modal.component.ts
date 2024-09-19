import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface DialogData {
  message: string;
  head: any;
  icon?: any;
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule], // Ensure MatDialogModule is imported
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('data in constructor', data);
  }

  ngOnInit(): void {
    console.log('data in ngOnInit', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
