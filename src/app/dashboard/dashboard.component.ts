import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  token:string = "";
  username:string = ""
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  url: string = "http://79.143.31.216/";
  links: Link[] = [];
  currentLink:Link = {id:0, short:"", target:"", counter:0};
  targetLink:string ="";
  constructor(private userService: UserService, private http: HttpClient) {
    userService.check();
    this.token = userService.token;
    this.username = userService.username;
  }

  ngOnInit(): void {
    this.userService.check();
    this.token = this.userService.token;
    this.username = this.userService.username;
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.http.get<Link[]>(this.url+'statistics',{headers:header})
      .subscribe(data => {
        this.links = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(data);
      });
  }

  squeeze() {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    this.http.post(this.url+'squeeze?link='+this.targetLink,{},{headers:header})
    .subscribe(data => {
      this.currentLink = data as Link;
      console.log(this.currentLink)
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

type Link = {
  id:number,
  short:string,
  target:string,
  counter:number
}