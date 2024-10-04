import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isTabsRoute: boolean = false;

  private previousUrl: string | undefined;
  private currentUrl: string | undefined;

  constructor(private loginService: LoginService, private router: Router,){
    this.router.events.subscribe(() => {
      this.isTabsRoute = this.router.url.includes('/tabs');
    });
  }

  ngOnInit() {
    let role = sessionStorage.getItem('role');
    if(!role){
      this.router.navigate(['/login']);
    }
  }

  async goBack() {
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
