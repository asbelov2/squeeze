import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string = ""
  username:string = ""
  public isLogined: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  url: string = "http://79.143.31.216/";
  result: any;
  constructor(private cookieService: CookieService, private http: HttpClient) { }

  check() {
    let tmpStr = this.cookieService.get('currentUser');
    let tmpObj;
    if(tmpStr)
      tmpObj = JSON.parse(tmpStr);
    if(tmpObj && tmpObj.username && tmpObj.token) {
      this.token = tmpObj.token;
      this.username = tmpObj.username;
      this.isLogined.next(true);
    }
  }

  login(username:string, password:string) {
    let  body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
    if (username && password)
      this.http.post(`${this.url}login`, body, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .subscribe({
          next: (data: any) => {
            this.token = data.access_token;
            this.username = username
            this.cookieService.set( 'currentUser', JSON.stringify({ token: this.token, username: this.username }) );
            this.result = { token: this.token, name: this.username }
          }, 
          error: (err) => {
            this.result = err
          }
      });
      this.isLogined.next(true);
  }

  signOut() {
    this.cookieService.delete('currentUser');
    this.username = "";
    this.token = "";
    this.isLogined.next(false);
  }
}
