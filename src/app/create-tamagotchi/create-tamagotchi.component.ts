import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-tamagotchi',
  templateUrl: './create-tamagotchi.component.html',
  styleUrls: ['./create-tamagotchi.component.css']
})
export class CreateTamagotchiComponent implements OnInit {
  userId: number = 0;

  constructor(private service: UserService, private router: Router) {

  }

  ngOnInit(): void {
    var userId = sessionStorage.getItem("userId");
    if (userId == null) {
      this.router.navigate(['']);
    }
    else {
      this.userId = Number.parseInt(userId);
    }
  }

  create(nameInput: string) : void {
      if (nameInput.trim().length <= 0) {
        alert("Field cannot be empty!");
      }
      else {
        this.service.createTamagotchi(this.userId, nameInput).subscribe(data => {
          if (data == null) {
              alert("Creation failed!");
          } 
          else {
              sessionStorage.setItem("tamagotchi", data.tamagotchi);
              this.router.navigate(['/home']);
          }
        })
      }
  }
}
