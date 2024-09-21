import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { CustomModalComponent } from '../shared/custom-modal/custom-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { DialogModule } from 'primeng/dialog';
// import { MessageService } from 'primeng/api';
// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
// import ConfirmationModalComponent
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-revised-price',
  standalone: true,
  imports: [DialogModule, MatIconModule, DynamicDialogModule, CalendarModule, ChartModule, MatTabsModule, MatRadioModule, DropdownModule, FormsModule, CommonModule, ReactiveFormsModule, CheckboxModule, HeaderComponent],
  templateUrl: './revised-price.component.html',
  styleUrl: './revised-price.component.scss'
})
export class RevisedPriceComponent {
  showTable: any = false;
  countries: any[] | undefined;
  formGroup: any;
  selectedCountry: any;
  showEditTable: any = false
  selectedCity: any;
  data: any;
  options: any;
  data2: any;
  options2: any;
  date1: Date | undefined;
  date2: Date | undefined;
  showParams: any = false;
  selectedOption: any;

  constructor(private dialog: MatDialog,) {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.countries = [
      { name: 'option 1', code: 'AU' },
      { name: 'option 2', code: 'BR' },
      { name: 'option 3', code: 'CN' },
      { name: 'option 4', code: 'EG' },
    ];

    this.formGroup = new FormGroup({
      city: new FormControl<string | null>(null)
    });
  }

  openModal(){
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: 'Changes Saved',
        message: 'The changes have been saved successfully.',
        buttonTextNo: 'Close',
      },
    });
    this.showTable = false;
    this.showParams = false;
  }


}
