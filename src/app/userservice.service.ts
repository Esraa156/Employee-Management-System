import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseurl:string='https://localhost:7289/Prduct';

  constructor(private http:HttpClient) {

 

   }
      getUsres():Observable<string[]>{
        
      return this.http.get<string[]>(this.baseurl);
    }
    addd(product:any){
      return this.http.post("https://localhost:7289/Prduct/Create", product);
    }
}
