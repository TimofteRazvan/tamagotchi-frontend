import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private service: UserService, private router: Router) {

  }

  ngOnInit(): void {
    
  }

  register(usernameInput: string, passwordInput: string) : void {
      if (usernameInput.trim().length <= 0 || passwordInput.trim().length <= 0) {
        alert("Fields cannot be empty!");
      }
      else {
        this.service.register(usernameInput, passwordInput).subscribe(data => {
          if (data == null) {
              alert("User already exists!");
          } 
          else {
              sessionStorage.setItem("username", data.username);
              sessionStorage.setItem("userId", data.id.toString());
              this.router.navigate(['/create-tamagotchi']);
          }
        })
      }
  }

}
