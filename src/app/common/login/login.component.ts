import { Component } from '@angular/core';
import { Router } from '@angular/router';  // ✅ Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {} // ✅ Inject Router

  login() {
    if (this.username === "admin" && this.password === "admin") {
      localStorage.setItem("username", this.username);
      this.router.navigate(['/']);  // ✅ Redirect to Home page
    } else {
      alert("Invalid Credentials");
    }
  }
}
