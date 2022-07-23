import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormRequestService {

  requestNewPokemon: Subject<void> = new Subject();
  
  constructor() { }
}
