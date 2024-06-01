import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  modalVisibility = new Subject<boolean>()

  constructor() { }

  showModal(data: boolean) {
    this.modalVisibility.next(data)
  }
}
