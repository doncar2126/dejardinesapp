import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) {}

   auth(data) {
    return this.http.post('https://florayfauna.app/server/public/api/auth',  
      JSON.stringify(data)
      );
   }
}
