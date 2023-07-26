import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Status } from '../models/status.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = "";
  userId: number = 0;
  tamagotchi: string = "";
  status: Status = new Status(0, 0);

  constructor(private userSerivce: UserService, private router: Router) {
  }

  ngOnInit(): void {
    var username = sessionStorage.getItem("username");
    var userId = sessionStorage.getItem("userId");
    var tamagotchi = sessionStorage.getItem("tamagotchi");
    if (username == null || userId == null || tamagotchi == null) {
      this.router.navigate(['']);
    }
    else {
      this.username = username;
      this.userId = Number.parseInt(userId);
      this.tamagotchi = tamagotchi;
      this.userSerivce.getStatus(Number.parseInt(userId)).subscribe(result => this.status = result);
    }
  }

  feed(): void {

  }

  play(): void {

  }

  removeUser(): void {
    localStorage.clear();
  }
}
