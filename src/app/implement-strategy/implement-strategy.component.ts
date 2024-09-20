import { Component } from '@angular/core';
import { CustomModalComponent } from '../shared/custom-modal/custom-modal.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-implement-strategy',
  standalone: true,
  imports: [CommonModule, DialogModule, MatIconModule, DynamicDialogModule, ],
  templateUrl: './implement-strategy.component.html',
  styleUrl: './implement-strategy.component.scss'
})
export class ImplementStrategyComponent {
  showMetrics: any = false;

  constructor(private dialog: MatDialog,) {

  }

  openModal(){
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: 'Confirmation',
        message: 'Do you want to save the changes.',
        buttonTextNo: 'No',
        buttonTextYes: 'Yes',
      },
    });
    // this.showTable = false
  }
}
