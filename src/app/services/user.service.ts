import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Status } from '../models/status.model';

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private authUrl = 'http://localhost:8080/auth';
    private url = 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }

    authenticate(username: string, password: string) : Observable<User> {
        return this.http.post<User>(this.authUrl, new User(username, password));
    }

    register(username: string, password: string) : Observable<User> {
        return this.http.post<User>(`${this.url}/register`, new User(username, password));
    }

    getStatus(id: number) : Observable<Status> {
        return this.http.get<Status>(`${this.url}/home/${id}`)
    }

    updateStatus(id: number, hunger: number, happiness: number, cleanliness: number, age: number) : Observable<Status> {
        //console.log("entered update Status")
        return this.http.post<Status>(`${this.url}/update-status/${id}`, new Status(hunger, happiness, cleanliness, age));
    }

    createTamagotchi(id: number, name: string) : Observable<User> {
        return this.http.post<User>(`${this.url}/create-tamagotchi/${id}`, name);
    }

    killTamagotchi(id: number) : Observable<string> {
        return this.http.get<string>(`${this.url}/kill-tamagotchi/${id}`);
    }

    // getPlayersWithMatchingName(name: string) : Observable<Array<Player>> {
    //     return this.http.get<Array<Player>>(`${this.url}/playersWithName?name=${name}`);
    // }

    // getFirstDegree(name: string) : Observable<Array<Player>> {
    //     return this.http.get<Array<Player>>(`${this.url}/players1?name=${name}`);
    // }

    // getSecondDegree(name: string) : Observable<Array<Player>> {
    //     return this.http.get<Array<Player>>(`${this.url}/players2?name=${name}`);
    // }

    // getThirdDegree(name: string) : Observable<Array<Player>> {
    //     return this.http.get<Array<Player>>(`${this.url}/players3?name=${name}`);
    // }
}