import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SrtService {

  constructor(private Http:HttpClient ) { }

  getLoad():Observable<any>{
    return this.Http.get<any>('vvv');
  }
}
