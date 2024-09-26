import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ImplementStrategyComponent } from './components/implement-strategy/implement-strategy.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PointOfSalesComponent } from './components/point-of-sales/point-of-sales.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ReviewChangesComponent } from './components/review-changes/review-changes.component';
import { RevisedPriceComponent } from './components/revised-price/revised-price.component';
import { StrategiesComponent } from './components/strategies/strategies.component';
import { StrategistTabsComponent } from './components/strategist-tabs/strategist-tabs.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { FilterTablePipe } from './shared/filter-table.pipe';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { CustomModalComponent } from './modals/custom-modal/custom-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import button
import { CheckboxModule } from 'primeng/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
// import { ChartModule } from 'primeng/chart';
// import ConfirmationModalComponent
// import { ReviewChangesComponent } from '../review-changes/review-changes.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Table, TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
// import MatRadioModule
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { provideClientHydration } from '@angular/platform-browser';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { ChangeFirstTimePasswordComponent } from './change-first-time-password/change-first-time-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImplementStrategyComponent,
    LandingPageComponent,
    PointOfSalesComponent,
    ProfilePageComponent,
    ReviewChangesComponent,
    RevisedPriceComponent,
    StrategiesComponent,
    StrategistTabsComponent,
    UserManagementComponent,
    FooterComponent,
    HeaderComponent,
    FilterTablePipe,
    ConfirmationModalComponent,
    CustomModalComponent,
    AddUserComponent,
    ChangeFirstTimePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DialogModule,
    FormsModule,
    MatIconModule,
    DynamicDialogModule,
    ToastModule,
    CommonModule,
    MatDialogModule,
    CheckboxModule,
MatTabsModule,
PaginatorModule,
MatSelectModule,
MatFormFieldModule,
TableModule,
MultiSelectModule,
RadioButtonModule,
MatRadioModule,
HttpClientModule,
BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync(), provideClientHydration(), CustomModalComponent, { provide: MatDialogRef, useValue: {}},  { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
