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

@Component({
  selector: 'app-strategies',
  standalone: true,
  imports: [DialogModule, MatIconModule, DynamicDialogModule, CalendarModule, ChartModule, MatTabsModule, MatRadioModule, DropdownModule, FormsModule, CommonModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './strategies.component.html',
  styleUrl: './strategies.component.scss'
})
export class StrategiesComponent {
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

  constructor(private dialog: MatDialog,) {

  }


  ngOnInit() {
    this.countries = [
        { name: 'option', code: 'AU' },
        { name: 'option', code: 'BR' },
        { name: 'option', code: 'CN' },
        { name: 'option', code: 'EG' },

    ];

    this.formGroup = new FormGroup({
      city: new FormControl<string | null>(null)
  });



  const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };


  const documentStyle2 = getComputedStyle(document.documentElement);
  const textColor2 = documentStyle2.getPropertyValue('--text-color');

  this.data2 = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [documentStyle2.getPropertyValue('--blue-500'), documentStyle2.getPropertyValue('--yellow-500'), documentStyle2.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle2.getPropertyValue('--blue-400'), documentStyle2.getPropertyValue('--yellow-400'), documentStyle2.getPropertyValue('--green-400')]
          }
      ]
  };


  this.options2 = {
      cutout: '60%',
      plugins: {
          legend: {
              labels: {
                  color: textColor2
              }
          }
      }
  };
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
  this.showTable = false
}


}
