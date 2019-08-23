import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByDOB',
  pure : false
})


export class FilterPipeDOB implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
  
    if(!items) return [];
    if(!searchText) return items;

searchText = searchText.toLowerCase();

return items.filter( it => {
      return it.dob.toLowerCase().includes(searchText);
    });
   }
}