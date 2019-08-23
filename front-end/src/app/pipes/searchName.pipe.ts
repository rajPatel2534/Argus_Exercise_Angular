import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName',
  pure : false
})


export class FilterPipeName implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
   
    if(!items) return [];
    if(!searchText) return items;

searchText = searchText.toLowerCase();

return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
   }
}