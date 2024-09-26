import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {
  transform(items: any[], productId?: string, description?: string, carat?: string, color?: string, clarity?: string, cut?: string): any[] {
    if (!items) return [];

    return items.filter(item => {
      return (!productId || item.id.includes(productId)) &&
             (!description || item.desc.includes(description)) &&
             (!carat || item.value1.includes(carat)) &&
             (!color || item.value2.includes(color)) &&
             (!clarity || item.clarity.includes(clarity)) &&
             (!cut || item.quality.includes(cut));
    });
  }
}
