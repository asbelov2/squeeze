import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token:string = "";
  username:string = "";
  isLogined:boolean = false;
  constructor(private router: Router, private userService: UserService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.userService.isLogined.subscribe( value => {
      this.isLogined = value;
      this.changeDetector.detectChanges()
    })
  }

  title = 'squeeze';
  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  goToSignupPage() {
    this.router.navigate(['/register']);
  }

  signOut() {
    this.userService.signOut()
    this.changeDetector.detectChanges()
  }
}
