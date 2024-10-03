import { Component } from '@angular/core';


// import { TableModule } from 'primeng/table';
// import { Product } from '@domain/product';
// import { ProductService } from '@service/productservice';
import { MessageService } from 'primeng/api';

import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';


@Component({
  selector: 'app-price-tracker',
  templateUrl: './price-tracker.component.html',
  styleUrl: './price-tracker.component.scss',
  providers: [MessageService]
})
export class PriceTrackerComponent {
  selectedProductCategory: any = ''
  defaultView: any = true;
  products!: any[];

  expandedRows = {};

  constructor( private messageService: MessageService) {}

  ngOnInit() {
    this.products = [
      {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5,
          orders: [
              {
                  id: '1000-0',
                  productCode: 'f230fh0g3',
                  date: '2020-09-13',
                  amount: 65,
                  quantity: 1,
                  customer: 'David James',
                  status: 'PENDING'
              },
              {
                  id: '1000-1',
                  productCode: 'f230fh0g3',
                  date: '2020-05-14',
                  amount: 130,
                  quantity: 2,
                  customer: 'Leon Rodrigues',
                  status: 'DELIVERED'
              },
              {
                  id: '1000-2',
                  productCode: 'f230fh0g3',
                  date: '2019-01-04',
                  amount: 65,
                  quantity: 1,
                  customer: 'Juan Alejandro',
                  status: 'RETURNED'
              },
              {
                  id: '1000-3',
                  productCode: 'f230fh0g3',
                  date: '2020-09-13',
                  amount: 195,
                  quantity: 3,
                  customer: 'Claire Morrow',
                  status: 'CANCELLED'
              }
          ]
      },
      {
          id: '1001',
          code: 'nvklal433',
          name: 'Black Watch',
          description: 'Product Description',
          image: 'black-watch.jpg',
          price: 72,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'INSTOCK',
          rating: 4,
          orders: [
              {
                  id: '1001-0',
                  productCode: 'nvklal433',
                  date: '2020-05-14',
                  amount: 72,
                  quantity: 1,
                  customer: 'Maisha Jefferson',
                  status: 'DELIVERED'
              },
              {
                  id: '1001-1',
                  productCode: 'nvklal433',
                  date: '2020-02-28',
                  amount: 144,
                  quantity: 2,
                  customer: 'Octavia Murillo',
                  status: 'PENDING'
              }
          ]
      },
      {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Blue Band',
          description: 'Product Description',
          image: 'blue-band.jpg',
          price: 79,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 3,
          orders: [
              {
                  id: '1002-0',
                  productCode: 'zz21cz3c1',
                  date: '2020-07-05',
                  amount: 79,
                  quantity: 1,
                  customer: 'Stacey Leja',
                  status: 'DELIVERED'
              },
              {
                  id: '1002-1',
                  productCode: 'zz21cz3c1',
                  date: '2020-02-06',
                  amount: 79,
                  quantity: 1,
                  customer: 'Ashley Wickens',
                  status: 'DELIVERED'
              }
          ]
      },
      {
          id: '1003',
          code: '244wgerg2',
          name: 'Blue T-Shirt',
          description: 'Product Description',
          image: 'blue-t-shirt.jpg',
          price: 29,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'INSTOCK',
          rating: 5,
          orders: []
      },
      {
          id: '1004',
          code: 'h456wer53',
          name: 'Bracelet',
          description: 'Product Description',
          image: 'bracelet.jpg',
          price: 15,
          category: 'Accessories',
          quantity: 73,
          inventoryStatus: 'INSTOCK',
          rating: 4,
          orders: [
              {
                  id: '1004-0',
                  productCode: 'h456wer53',
                  date: '2020-09-05',
                  amount: 60,
                  quantity: 4,
                  customer: 'Mayumi Misaki',
                  status: 'PENDING'
              },
              {
                  id: '1004-1',
                  productCode: 'h456wer53',
                  date: '2019-04-16',
                  amount: 2,
                  quantity: 30,
                  customer: 'Francesco Salvatore',
                  status: 'DELIVERED'
              }
          ]
      },
      {
          id: '1023',
          code: '5k43kkk23',
          name: 'Purple T-Shirt',
          description: 'Product Description',
          image: 'purple-t-shirt.jpg',
          price: 49,
          category: 'Clothing',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 5,
          orders: [
              {
                  id: '1023-0',
                  productCode: '5k43kkk23',
                  date: '2020-04-15',
                  amount: 49,
                  quantity: 1,
                  customer: 'Gladys Rim',
                  status: 'RETURNED'
              }
          ]
      },
      {
          id: '1024',
          code: 'lm2tny2k4',
          name: 'Shoes',
          description: 'Product Description',
          image: 'shoes.jpg',
          price: 64,
          category: 'Clothing',
          quantity: 0,
          inventoryStatus: 'INSTOCK',
          rating: 4,
          orders: []
      },
      {
          id: '1025',
          code: 'nbm5mv45n',
          name: 'Sneakers',
          description: 'Product Description',
          image: 'sneakers.jpg',
          price: 78,
          category: 'Clothing',
          quantity: 52,
          inventoryStatus: 'INSTOCK',
          rating: 4,
          orders: [
              {
                  id: '1025-0',
                  productCode: 'nbm5mv45n',
                  date: '2020-02-19',
                  amount: 78,
                  quantity: 1,
                  customer: 'Yuki Whobrey',
                  status: 'DELIVERED'
              },
              {
                  id: '1025-1',
                  productCode: 'nbm5mv45n',
                  date: '2020-05-21',
                  amount: 78,
                  quantity: 1,
                  customer: 'Fletcher Flosi',
                  status: 'PENDING'
              }
          ]
      }
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

}
