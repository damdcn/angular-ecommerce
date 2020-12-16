import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
subject = new Subject();

  constructor() { }

  sendMsg(product :any){
    this.subject.next(product);
  }

  getMsg(){
  return this.subject.asObservable();
  }
}