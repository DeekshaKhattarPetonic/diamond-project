import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-point-of-sales',
  standalone: true,
  imports: [RadioButtonModule, FormsModule],
  templateUrl: './point-of-sales.component.html',
  styleUrl: './point-of-sales.component.scss'
})
export class PointOfSalesComponent {
  ingredient!: string;

}
