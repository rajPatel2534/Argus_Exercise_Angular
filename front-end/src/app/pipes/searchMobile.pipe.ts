import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByMobile',
  pure : false
})


export class FilterPipeMobile implements PipeTransform {
  transform(items: any[], searchText: number): any[] {
   
    if(!items) return [];
    if(!searchText) return items;

;

return items.filter( it => {
      return it.mobile.toString().includes(searchText.toString());
    });
   }
}