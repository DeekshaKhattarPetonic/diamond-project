import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { StrategiesComponent } from './components/strategies/strategies.component';
import { PointOfSalesComponent } from './components/point-of-sales/point-of-sales.component';
import { StrategistTabsComponent } from './components/strategist-tabs/strategist-tabs.component';
import { RevisedPriceComponent } from './components/revised-price/revised-price.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { LoginNewComponent } from './components/login-new/login-new.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginNewComponent },
  { path: 'admin', component: UserManagementComponent },
  { path: 'strategy', component: StrategiesComponent },
  { path: 'pos', component: PointOfSalesComponent },
  { path: 'tabs', component: StrategistTabsComponent },
  { path: 'revised-price', component: RevisedPriceComponent },
  { path: 'profile', component: ProfilePageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
