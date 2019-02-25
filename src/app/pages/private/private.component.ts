import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public user: User = null

  ngOnInit() {
    this.auth.user.subscribe(data => {
      this.user = data
    })
  }

}
