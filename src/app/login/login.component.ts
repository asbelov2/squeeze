import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";

  token: any = "";
  error: any;

  constructor(private router: Router, private userService:UserService, private changeDetector:ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  onSubmit(e: any) {
    if (this.username && this.password) {
    this.userService.login(this.username, this.password)
        this.router.navigate(['/dashboard']);
        this.changeDetector.detectChanges();
    }
  }
}
