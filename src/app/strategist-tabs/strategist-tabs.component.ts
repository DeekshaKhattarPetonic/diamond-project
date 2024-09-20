import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-strategist-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './strategist-tabs.component.html',
  styleUrl: './strategist-tabs.component.scss'
})
export class StrategistTabsComponent {

}
