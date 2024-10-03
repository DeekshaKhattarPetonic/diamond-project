import { Component } from '@angular/core';
import { StrategyDetailComponent } from '../../shared/strategy-detail/strategy-detail.component';
import { ProductDetailComponent } from '../../shared/product-detail/product-detail.component';
// import { TableModule } from 'primeng/table';
// import { Product } from '@domain/product';
// import { ProductService } from '@service/productservice';
import { MessageService } from 'primeng/api';

import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-price-tracker',
  templateUrl: './price-tracker.component.html',
  styleUrl: './price-tracker.component.scss',
  providers: [MessageService]
})
export class PriceTrackerComponent {
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
          description: 'Round cut, 1 carat , excellent clarity',
          original_price: '$2,000',
          current_price: '$4,500',
          last_modified: '24-05-2023',
      },
      {
          id: 'D002',
          description: 'Round cut, 1 carat , excellent clarity',
          original_price: '$2,000',
          current_price: '$4,500',
          last_modified: '24-05-2023',
          orders: [
              {
                original_price: '$2,000',
                modified_price: '$4,500',
                modified_date: '24-05-2023',
              },
              {
                original_price: '$2,000',
                modified_price: '$4,000',
                modified_date: '26-05-2023',
              },
              {
                original_price: '$2,000',
                modified_price: '$5,500',
                modified_date: '29-06-2023',
              },
              {
                original_price: '$2,000',
                modified_price: '$6,500',
                modified_date: '26-08-2023',
              },

          ]
      },
      {
        id: 'D003',
        description: 'Round cut, 1 carat , excellent clarity',
        original_price: '$2,000',
        current_price: '$4,500',
        last_modified: '24-05-2023',

    },

    {
      id: 'D004',
      description: 'Round cut, 1 carat , excellent clarity',
      original_price: '$4,000',
      current_price: '$6,500',
      last_modified: '26-12-2023',
      orders: [
          {
            original_price: '$2,000',
            modified_price: '$4,500',
            modified_date: '12-05-2023',
          },
          {
            original_price: '$2,000',
            modified_price: '$4,000',
            modified_date: '26-08-2023',
          },
          {
            original_price: '$2,000',
            modified_price: '$5,500',
            modified_date: '29-09-2023',
          },
          {
            original_price: '$2,000',
            modified_price: '$6,500',
            modified_date: '26-12-2023',
          },

      ]
  },

  {
    id: 'D005',
    description: 'Round cut, 1 carat , excellent clarity',
    original_price: '$2,000',
    current_price: '$9,500',
    last_modified: '24-05-2023',
    orders: [
        {
          original_price: '$2,000',
          modified_price: '$4,900',
          modified_date: '24-05-2023',
        },
        {
          original_price: '$2,000',
          modified_price: '$5,000',
          modified_date: '28-05-2023',
        },
        {
          original_price: '$2,000',
          modified_price: '$6,500',
          modified_date: '09-08-2023',
        },
        {
          original_price: '$2,000',
          modified_price: '$9,500',
          modified_date: '26-09-2023',
        },

    ]
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
    let product: any = {
      cut: 'round',
      carat: '20',
      shape: '$2,000',
      clarity: 'Excellence',
      color: 'G',
      id: 'D001',
      description: 'Round cut, 1 carat , excellent clarity',
    }

    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '60vw',
      data: {
        product: product,
      },
    });
  }

}
