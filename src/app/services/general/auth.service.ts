import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  checkSession() {
    if (localStorage.getItem("password") != null && localStorage.getItem("password") == 'admin') {
      this.router.navigate(['/compta'])
      return true
    }
    return false
  }
}
