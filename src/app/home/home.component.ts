import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Status } from '../models/status.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = "";
  userId: number = 0;
  tamagotchiName: string = "";
  tamagotchiSpecies: string = "";
  status: Status = new Status(0, 0, 0, 0);
  subscription: Subscription = new Subscription;
  feeling: string = "fine";
  stage: string = "";
  avatar: string = "";

  constructor(private userSerivce: UserService, private router: Router) {
  }

  ngOnInit(): void {
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.passTime());
    var username = sessionStorage.getItem("username");
    var userId = sessionStorage.getItem("userId");
    var tamagotchiName = sessionStorage.getItem("tamagotchiName");
    var tamagotchiSpecies = sessionStorage.getItem("tamagotchiSpecies");
    if (username == null || userId == null) {
      this.router.navigate(['']);
    }
    else if (tamagotchiName == "" || tamagotchiName == null || tamagotchiSpecies == "" || tamagotchiSpecies == null) {
      this.router.navigate(['create-tamagotchi'])
    }
    else {
      this.username = username;
      this.userId = Number.parseInt(userId);
      this.tamagotchiName = tamagotchiName;
      this.tamagotchiSpecies = tamagotchiSpecies;
      this.userSerivce.getStatus(Number.parseInt(userId)).subscribe(result => this.status = result);
      if (this.status.age >= 100) {
        if (this.status.age < 200) {
          this.stage = "Teenager";
          this.avatar = "/assets/images/" + this.tamagotchiSpecies + "2.png";
        }
        else if (this.status.age >= 200) {
          this.stage = "Adult";
          this.avatar = "/assets/images/" + this.tamagotchiSpecies + "3.png";
        }
      }
      else {
        this.stage = "Child";
        this.avatar = "/assets/images/" + this.tamagotchiSpecies + "1.png";
      }
    }
  }

  passTime() : void {
    this.status.happiness = this.status.happiness - 1;
    this.status.hunger = this.status.hunger - 1;
    this.status.cleanliness = this.status.cleanliness - 1;
    this.status.age = this.status.age + 1;
    this.userSerivce.updateStatus(this.userId, this.status.hunger, this.status.happiness, this.status.cleanliness, this.status.age).subscribe(result => this.status = result);
    if (this.status.hunger <= 50 || this.status.happiness <= 50 || this.status.cleanliness <= 50) {
      if (this.status.hunger <= 50) {
        if (this.status.hunger > 0) {
          this.feeling = "hungry";
        }
        else {
          alert("Your tamagotchi has died of hunger!")
          this.userSerivce.killTamagotchi(this.userId);
          this.router.navigate(['create-tamagotchi'])
        }
      }
      if (this.status.happiness <= 50) {
        if (this.status.happiness > 0) {
          this.feeling = "sad";
        }
        else {
          alert("Your tamagotchi has died of sadness!");
          this.userSerivce.killTamagotchi(this.userId);
          this.router.navigate(['create-tamagotchi'])
        }
      }
      if (this.status.cleanliness <= 50) {
        if (this.status.cleanliness > 0) {
          this.feeling = "dirty";
        }
        else {
          alert("Your tamagotchi has left!");
          this.userSerivce.killTamagotchi(this.userId);
          this.router.navigate(['create-tamagotchi'])
        }
      }
    }
    else {
      this.feeling = "fine";
    }
    if (this.status.age >= 100) {
      if (this.status.age < 200) {
        this.stage = "Teenager";
        this.avatar = "/assets/images/" + this.tamagotchiSpecies + "2.png";
      }
      else if (this.status.age >= 200) {
        this.stage = "Adult";
        this.avatar = "/assets/images/" + this.tamagotchiSpecies + "3.png";
      }
    }
    else {
      this.stage = "Child";
      this.avatar = "/assets/images/" + this.tamagotchiSpecies + "1.png"
    }
  }

  feed(): void {
    this.status.hunger = 100;
    this.userSerivce.updateStatus(this.userId, this.status.hunger, this.status.happiness, this.status.cleanliness, this.status.age).subscribe(result => this.status = result);
  }

  play(): void {
    this.status.happiness = 100;
    this.userSerivce.updateStatus(this.userId, this.status.hunger, this.status.happiness, this.status.cleanliness, this.status.age).subscribe(result => this.status = result);
  }

  clean() : void {
    this.status.cleanliness = 100;
    this.userSerivce.updateStatus(this.userId, this.status.hunger, this.status.happiness, this.status.cleanliness, this.status.age).subscribe(result => this.status = result);
  }

  create(): void {
    this.router.navigate(['create-tamagotchi'])
  }

  removeUser(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
