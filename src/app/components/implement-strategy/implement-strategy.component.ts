import { Component, EventEmitter, Output } from '@angular/core';
import { CustomModalComponent } from '../../modals/custom-modal/custom-modal.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-implement-strategy',
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
  // date1: any;
  // date2: any;
  today: Date = new Date(); // Current date
  date1: Date | null = null; // From Date
  date2: Date | null = null; // To Date
  minToDate: Date | null = null;

  constructor(private dialog: MatDialog,) {

  }

  openModal(){

    if(this.date1 == null || this.date2 == null){
      const dialogRef = this.dialog.open(CustomModalComponent, {
        width: '35vw',
        data: {
          head: 'Confirmation',
          message: 'Please select from and to date to proceed',
          buttonTextNo: 'Close',
        },
      });
    }

    else{
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

  }


  onCancel() {
    this.cancel.emit(); // Emit the cancel event when the button is clicked
  }

  onFromDateSelect() {
    if (this.date1) {
      this.minToDate = new Date(this.date1); // Set To Date's minDate to From Date
    }
  }
}
