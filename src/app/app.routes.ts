import { StrategistTabsComponent } from './strategist-tabs/strategist-tabs.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { RevisedPriceComponent } from './revised-price/revised-price.component';
import { PointOfSalesComponent } from './point-of-sales/point-of-sales.component';
// import StrategistTabsComponent

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: UserManagementComponent },
  { path: 'strategy', component: StrategiesComponent },
  { path: 'pos', component: PointOfSalesComponent },
  { path: 'tabs', component: StrategistTabsComponent },
  { path: 'revised-price', component: RevisedPriceComponent },
];

