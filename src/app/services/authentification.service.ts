import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
users:AppUser[]=[]; //tableau de users
  AutthentificatedUser:AppUser|undefined;
  constructor() {
    this.users.push({userId:UUID.UUID() , username:'admin',password:'admin',roles:['ADMIN','USER']});
    this.users.push({userId:UUID.UUID() , username:'user1',password:'1234',roles:['USER']});
    this.users.push({userId:UUID.UUID() , username:'user2',password:'1234',roles:['USER']});

  }
  public login(usename:string,password:string):Observable<AppUser>{
let user=this.users.find(user=>user.username===usename);
    if(!user){
      return throwError(()=>new Error("User not found"));
    }
    if(user.password!==password){
      return throwError(()=>new Error("Bad password"));
    }
    return of(user);
  }
  public AuthentificatedUser(appUser:AppUser):Observable<boolean>{
    this.AutthentificatedUser=appUser;
    localStorage.setItem('authUser',JSON.stringify({username:appUser.username,roles:appUser.roles}));
  return of(true);
  }
 public hasRole(role:string):boolean{
    if(!this.AutthentificatedUser){
      return false;
    }
    return this.AutthentificatedUser.roles.includes(role);
 }
 public isAuthentificated():boolean{
    return this.AutthentificatedUser!==undefined;
 }
 public logout():Observable<boolean>{
    this.AutthentificatedUser=undefined;
    localStorage.removeItem('authUser');
    return of(true);
 }
}
