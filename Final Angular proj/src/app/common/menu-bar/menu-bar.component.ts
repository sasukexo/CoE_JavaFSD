import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  status: boolean = false;
  loginmenu: string = "Login";

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateMenu();
  }

  loginhandler() {
    if (this.status) {
      localStorage.removeItem("username");
      this.status = false;
      this.loginmenu = "Login";
    } else {
      this.router.navigate(['/login']).then(() => {
        location.reload(); // ✅ Force refresh after login
      });
    }
  }
  
  updateMenu(): void {
    let username = localStorage.getItem("username");
    if (username) {
      this.status = true;
      this.loginmenu = `${username}, Logout`;
    } else {
      this.status = false;
      this.loginmenu = "Login";
    }
    this.cdr.detectChanges(); // Force UI update
  }
}
