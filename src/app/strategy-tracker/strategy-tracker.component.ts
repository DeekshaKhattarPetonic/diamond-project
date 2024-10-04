import { StrategyDetailComponent } from './../shared/strategy-detail/strategy-detail.component';
import { Component } from '@angular/core';
// import { ProductDetailComponent } from '../../shared/product-detail/product-detail.component';
// import { TableModule } from 'primeng/table';
// import { Product } from '@domain/product';
// import { ProductService } from '@service/productservice';
import { MessageService } from 'primeng/api';

import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-strategy-tracker',
  templateUrl: './strategy-tracker.component.html',
  styleUrl: './strategy-tracker.component.scss',
  providers: [MessageService],
})
export class StrategyTrackerComponent {

  searchValue: any = ''
  selectedProductCategory: any = ''
  defaultView: any = true;
  products!: any[];
  productCategories: any;
  expandedRows = {};
  productTypes: any = [];
  selectedProductType: any = '';

  constructor( private messageService: MessageService, private dialog: MatDialog,) {}

  ngOnInit() {
    this.products = [
      {
          id: 'D001',
          description: 'To make a product more attractive to customers, you can offer a limited-time discount or a special promotion.',
          name: 'Psychological Pricing Strategy',
          impact: 'Enhance Customer Loyalty',
          last_modified: '24-05-2023',
      },
      {
        id: 'D002',
        description: 'For eveloping a pricing strategy, you can start by analyzing your competitors and their pricing strategies.',
        name: 'Dynamic Pricing Strategy',
        impact: 'Enhance Customer Loyalty',
        last_modified: '24-05-2023',
    },
    {
      id: 'D003',
      description: 'Competitive pricing is a strategy where a company sets its prices based on the prices of its competitors.',
      name: 'Competitive Pricing Strategy',
      impact: 'Enhance Customer Loyalty',
      last_modified: '24-05-2023',
  },
  {
    id: 'D004',
    description: 'Penetration Pricing Strategy is a pricing strategy where a company sets a low initial price for a new product or service to gain market share quickly.',
    name: 'Penetration Pricing Strategy',
    impact: 'Enhance Customer Loyalty',
    last_modified: '24-05-2023',
},
  ];

  this.productCategories = [
      { name: 'Product Category 1', key: '1' },
      { name: 'Product category 2', key: '2' },
      { name: 'Product category 3', key: '3' },
      { name: 'Product category 4', key: '4' }
  ];

  this.productTypes = [
    { name: 'Product Type 1', key: '1' },
    { name: 'Product Type 2', key: '2' },
    { name: 'Product Type 3', key: '3' },
    { name: 'Product Type 4', key: '4' }
];
}

expandAll() {
  this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
}

collapseAll() {
  this.expandedRows = {};
}

getSeverity(status: string): any {
  switch (status) {
      case 'INSTOCK':
          return 'success';
      case 'LOWSTOCK':
          return 'warning';
      case 'OUTOFSTOCK':
          return 'danger';
  }
}

getStatusSeverity(status: string): any {
  switch (status) {
      case 'PENDING':
          return 'warning';
      case 'DELIVERED':
          return 'success';
      case 'CANCELLED':
          return 'danger';
  }
}

onRowExpand(event: TableRowExpandEvent) {
  // this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
}

onRowCollapse(event: TableRowCollapseEvent) {
  // this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
}

  onCllickViewStrategy() {
    let strategy: any = {
      id: 'S001',
      desc: '20',
      name: 'Value Based Pricing Strategy',
    }

    const dialogRef = this.dialog.open(StrategyDetailComponent, {
      width: '60vw',
      data: {
        strategy: strategy,
      },
    });
  }

}
