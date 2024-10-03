import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private loginService: LoginService, private router: Router,){

  }

  async goBack() {
    // await this.ContributorService.setSelectedChallenge(this.selectedCh);
    // this.Router.navigate(['/contributor-list']);
    window.history.back();
}

logout(){
  this.loginService.setName('');
  this.loginService.setRole('');
  this.loginService.setEmail('');
  this.loginService.setuserId('')
  this.loginService.setSubscriptionId('')
  this.router.navigate(['/login']);
}

}
