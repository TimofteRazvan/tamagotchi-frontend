import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
    constructor(private service: UserService, private router: Router) {

    }

    ngOnInit(): void {
      
    }

    login(usernameInput: string, passwordInput: string) : void {
        if (usernameInput.trim().length <= 0 || passwordInput.trim().length <= 0) {
          alert("Fields cannot be empty!");
        }
        else {
          this.service.authenticate(usernameInput, passwordInput).subscribe(data => {
            if (data == null) {
                alert("No such user!");
            } 
            else {
                sessionStorage.setItem("username", data.username);
                sessionStorage.setItem("userId", data.id.toString());
                sessionStorage.setItem("tamagotchiName", data.tamagotchiName);
                sessionStorage.setItem("tamagotchiSpecies", data.tamagotchiSpecies);
                this.router.navigate(['/home']);
            }
          })
        }
    }
}