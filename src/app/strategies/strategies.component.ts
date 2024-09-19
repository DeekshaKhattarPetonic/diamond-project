import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-strategies',
  standalone: true,
  imports: [MatTabsModule, MatRadioModule, DropdownModule, FormsModule, CommonModule, ReactiveFormsModule, CheckboxModule],
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
}

}
