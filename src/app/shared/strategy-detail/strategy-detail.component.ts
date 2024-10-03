import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-strategy-detail',
  templateUrl: './strategy-detail.component.html',
  styleUrl: './strategy-detail.component.scss'
})

export class StrategyDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<StrategyDetailComponent>,
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
