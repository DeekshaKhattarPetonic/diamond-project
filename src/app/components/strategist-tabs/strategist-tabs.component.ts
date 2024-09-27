import { Component } from '@angular/core';

@Component({
  selector: 'app-strategist-tabs',
  templateUrl: './strategist-tabs.component.html',
  styleUrl: './strategist-tabs.component.scss'
})
export class StrategistTabsComponent {

  async goBack() {
    // await this.ContributorService.setSelectedChallenge(this.selectedCh);
    // this.Router.navigate(['/contributor-list']);
    window.history.back();
}

}
