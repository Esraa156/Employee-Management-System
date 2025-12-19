import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Observable } from 'rxjs'; // مهم جداً

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent  {

  users:any[]=[];
   searchText:string='';
     filterusr:any[]=[];


  constructor (private _UserserviceService:UserserviceService){}

loadUsers(){
  this._UserserviceService.getUsres().subscribe((results:any)=>

  {
    console.log(results);
      this.users=results;
  },
  (error) => { console.error(error);}
  )
}
LoadFiltered(){
 this.filterusr= this.users.filter(user=>user.toLowerCase().includes(this.searchText.toLowerCase()))
}
}
