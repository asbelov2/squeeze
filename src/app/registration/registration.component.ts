import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  username: string = "";
  password: string = "";
  isInvalid: boolean = false;
  url = "http://79.143.31.216/"

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(e:any) { 
    if(this.username && this.password)
    this.http.post(`${this.url}register?username=${this.username}&password=${this.password}`,{})
        .subscribe({next:(data:any) => {
          console.log(data)
        }});
  }
}
