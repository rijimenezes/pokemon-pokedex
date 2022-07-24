import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  /**
   * @Input searchText para indicar cuando se inicia la busqueda desde el input
   */
  @Input() searchText?: Subject<string>;
  /**
   * @var search variable para utilizar con ngmodel y poder utilizar el evento (ngModelOnchange) en lugar de (keyup)
   */
  search: string = '';

  constructor() {}

  /**
   * Emitir evento de busqueda a la api
   * @param search texto a buscar
   */
  onSearch(search: string) {
    this.searchText?.next(search);
  }
}
