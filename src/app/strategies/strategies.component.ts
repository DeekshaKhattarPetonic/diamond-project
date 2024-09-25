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
import { ImplementStrategyComponent } from '../implement-strategy/implement-strategy.component';
// import { MessageService } from 'primeng/api';
// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
// import ConfirmationModalComponent
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-strategies',
  standalone: true,
  imports: [HeaderComponent, TooltipModule, ImplementStrategyComponent, DialogModule, MatIconModule, DynamicDialogModule, CalendarModule, ChartModule, MatTabsModule, MatRadioModule, DropdownModule, FormsModule, CommonModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './strategies.component.html',
  styleUrl: './strategies.component.scss'
})
export class StrategiesComponent {
  showOtherStrategy: any = false;
  implement_page: any = false;
  showTable: any = false;
  countries: any[] | undefined;
  selectedStrategy: any;
  selectedStrategyDraft: any;
  strategies: any[] | undefined
  formGroup: any;
  selectedCountry: any;
  showEditTable: any = false
  selectedCity: any;
  data: any;
  animate: boolean = false;
  options: any;
  data2: any;
  showData: any = false;
  options2: any;
  date1: Date | undefined;
  selectedCategory: any;
  selectedObjective: any;
  date2: Date | undefined;
  targetCategoryData: any = []
  objectivesArr: any = [];

  constructor(private dialog: MatDialog,) {

  }


  ngOnInit() {

    // this.selectedCategory.name = '';
    // this.selectedObjective.name = '';

    this.countries = [
        { name: 'option', code: 'AU' },
        { name: 'option', code: 'BR' },
        { name: 'option', code: 'CN' },
        { name: 'option', code: 'EG' },
    ];

    this.strategies = [
      { name: 'Value Based Pricing Strategy', code: 'AU' },
      { name: 'Real Time Pricing Strategy', code: 'BR' },
      { name: 'Competitive Pricing Strategy', code: 'CN' },
      { name: 'Segmented Pricing Strategy', code: 'EG' },
      { name: 'Time Based Pricing Strategy', code: 'CN' },
      { name: 'Brand Pricing Strategy', code: 'EG' },
      { name: 'Market Penetration Pricing Strategy', code: 'CN' },

  ];

  this.targetCategoryData = [
    { name: 'Customer Based', code: 'AU' },
    { name: 'Market Oriented', code: 'BR' },
    { name: 'Product Based', code: 'CN' },
  ]

    this.formGroup = new FormGroup({
      city: new FormControl<string | null>(null)
  });



  this.selectedStrategy = { name: '', code: '' }
  this.selectedObjective = { name: '', code: '' }
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
  this.selectedCountry = ''
  this.showTable = false
}

onStrategyChange() {
  console.log(this.selectedStrategy); // This will print the selected strategy object

  this.animate = true;

  this.implement_page = false;
  this.showData = false;

  // Remove animation class after the animation duration (0.5s in this case)
  setTimeout(() => {
    this.animate = false;
  }, 500);
}

onObjChange(){
  console.log('selectedObjective', this.selectedObjective)
  if(this.selectedObjective.name == 'Maximize revenue & Profit '){
    this.selectedStrategyDraft = { name: 'Value-Based Pricing Strategy', code: 'AU' }
    this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Enhance Customer Loyalty'){
    this.selectedStrategyDraft = { name: 'Loyalty-Based Pricing Strategy', code: 'AU' }
    this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Enhance Customer Perception'){
    this.selectedStrategyDraft = { name: 'Psychological Pricing Strategy', code: 'AU' }
    this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Enhance Customer Loyalty & Improve Cash Flow'){
    this.selectedStrategyDraft = { name: 'Subscription Pricing Strategy', code: 'AU' }
    this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Increase Market Share'){
    this.selectedStrategyDraft = { name: 'Penetration Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Launch a New Product'){
    this.selectedStrategyDraft = { name: 'Introductory Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Respond to Competitive Pressure'){
    this.selectedStrategyDraft = { name: 'Competitive Pricing Strategy', code: 'AU' }
    this.showOtherStrategy = false;
  }

  if(this.selectedObjective.name == 'Adapt to Market Fluctuations'){
    this.selectedStrategyDraft = { name: 'Dynamic Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Target a Niche Market'){
    this.selectedStrategyDraft = { name: 'Geographical Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Optimize Inventory Management'){
    this.selectedStrategyDraft = { name: 'Seasonal Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Increase Market Share (Cost Control Focus)'){
    this.selectedStrategyDraft = { name: 'Economy Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Clear Excess Inventory'){
    this.selectedStrategyDraft = { name: 'Flash Sale Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Maximize Revenue across segments'){
    this.selectedStrategyDraft = { name: 'Sregmented Pricing  Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Position as a Premium Brand'){
    this.selectedStrategyDraft = { name: 'Premium Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Improve Cash Flow'){
    this.selectedStrategyDraft = { name: 'Cost-Plus Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Boost Sales Volume'){
    this.selectedStrategyDraft = { name: 'Bundle Pricing Strategy', code: 'AU' }
        this.showOtherStrategy = true;
  }

  if(this.selectedObjective.name == 'Maximize Profit for New Products'){
    this.selectedStrategyDraft = { name: 'Price Skimming Strategy', code: 'AU' }
        this.showOtherStrategy = true;

  }
  console.log('this.selectedStrategy', this.selectedStrategy)
  // if(this.selectedObjective == ''){
  //   this.selectedStrategy = { name: ' Strategy', code: 'AU' }
  // }

  // !implement_page && selectedObjective
  // this.implement_page = false;
  // this.selectedObjective = ''
  this.implement_page = false;
  this.showData = false;
  // this.selectedObjective = ''

}

onCategoryChange(){
  console.log('selectedCategory', this.selectedCategory)
  this.selectedObjective = ''
  this.showData = false;
  if(this.selectedCategory.name == 'Customer Based'){
    this.objectivesArr = [
      {
        name: 'Maximize revenue & Profit ',
        code: 'AU'
      },
      {
        name: 'Enhance Customer Loyalty',
        code: 'AU'
      },
      {
        name: 'Enhance Customer Perception',
        code: 'AU'
      },
      {
        name: 'Enhance Customer Loyalty & Improve Cash Flow',
        code: 'AU'
      },

    ]
  }

  if(this.selectedCategory.name == 'Product Based'){
    this.objectivesArr = [
      {
        name: 'Position as a Premium Brand',
        code: 'AU'
      },
      {
        name: 'Improve Cash Flow',
        code: 'AU'
      },
      {
        name: 'Boost Sales Volume',
        code: 'AU'
      },
      {
        name: 'Maximize Profit for New Products',
        code: 'AU'
      },

    ]
  }

  if(this.selectedCategory.name == 'Market Oriented'){
    this.objectivesArr = [
      {
        name: 'Increase Market Share',
        code: 'AU'
      },
      {
        name: 'Launch a New Product',
        code: 'AU'
      },
      {
        name: 'Respond to Competitive Pressure',
        code: 'AU'
      },
      {
        name: 'Adapt to Market Fluctuations',
        code: 'AU'
      },
      {
        name: 'Target a Niche Market',
        code: 'AU'
      },
      {
        name: 'Optimize Inventory Management',
        code: 'AU'
      },
      {
        name: 'Increase Market Share (Cost Control Focus)',
        code: 'AU'
      },
      {
        name: 'Clear Excess Inventory',
        code: 'AU'
      },
      {
        name: 'Maximize Revenue across segments',
        code: 'AU'
      }
    ]
  }
}

showParams(){
  this.showData = true;
  this.selectedStrategy = this.selectedStrategyDraft
}

onImplementStrategy(){
  if(this.selectedCategory == '' || this.selectedObjective == '' || !this.showData){
    this.implement_page = false;
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: '',
        message: 'Please select Target Category and Business Objective to implement the strategy',
        buttonTextNo: 'Close',
      },
    });
  }
  else{
    this.implement_page = true;
  }

  console.log('implement_page', this.implement_page)

  // this.implement_page = true;
}

hideImplementPage() {
  this.implement_page = false; // Hide the implement strategy component
  this.selectedCategory.name = null;
  this.selectedObjective.name = null;

   this.implement_page = false
    this.selectedObjective = false;
    this.showData = false;

    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: '',
        message: 'The changes have been saved successfully',
        buttonTextNo: 'Close',
      },
    });

    this.strategies = [
      { name: 'Value Based Pricing Strategy', code: 'AU' },
      { name: 'Real Time Pricing Strategy', code: 'BR' },
      { name: 'Competitive Pricing Strategy', code: 'CN' },
      { name: 'Segmented Pricing Strategy', code: 'EG' },
      { name: 'Time Based Pricing Strategy', code: 'CN' },
      { name: 'Brand Pricing Strategy', code: 'EG' },
      { name: 'Market Penetration Pricing Strategy', code: 'CN' },

  ];

  this.targetCategoryData = [
    { name: 'Customer Based', code: 'AU' },
    { name: 'Market Oriented', code: 'BR' },
    { name: 'Product Based', code: 'CN' },
  ]
}

}
