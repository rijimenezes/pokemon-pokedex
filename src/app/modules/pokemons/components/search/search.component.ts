import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchText?: Subject<string>;

  search: string = '';

  constructor() { }

  ngOnInit(): void {    
  }

  onSearch(search: string){
    console.log({search});
    
    this.searchText?.next(search);
  }

}
