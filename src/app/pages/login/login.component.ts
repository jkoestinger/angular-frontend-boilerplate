import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  errors = []

  ngOnInit() {
    
  }

  login(data) {
    this.auth.login(data.username, data.password).subscribe(() => {
      console.log('login successful')
    }, err => {
      this.errors = err.error.non_field_errors
    })
    
  }

}
