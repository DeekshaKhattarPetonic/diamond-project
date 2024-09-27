import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  async goBack() {
    // await this.ContributorService.setSelectedChallenge(this.selectedCh);
    // this.Router.navigate(['/contributor-list']);
    window.history.back();
}

}
