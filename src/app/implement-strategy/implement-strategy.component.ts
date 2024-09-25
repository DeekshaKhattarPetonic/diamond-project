import { Component, EventEmitter, Output } from '@angular/core';
import { CustomModalComponent } from '../shared/custom-modal/custom-modal.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-implement-strategy',
  standalone: true,
  imports: [CommonModule, DialogModule, MatIconModule, DynamicDialogModule, CalendarModule],
  templateUrl: './implement-strategy.component.html',
  styleUrl: './implement-strategy.component.scss'
})

export class ImplementStrategyComponent {
  @Output() cancel = new EventEmitter<void>();
  showMetrics: any = false;
  options: any;
  data2: any;
  showData: any = false;
  options2: any;
  date1: any;

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

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      // If the user clicked "Yes" in the modal
      if (result === true) {
        this.cancel.emit();
      } else {
        // this.cancel.emit();
      }
    });
    // this.showTable = false
  }


  onCancel() {
    this.cancel.emit(); // Emit the cancel event when the button is clicked
  }
}
