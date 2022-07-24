import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  @Input() searchText?: Subject<string>;

  search: string = '';

  constructor() { }

  onSearch(search: string){
    this.searchText?.next(search);
  }

}
