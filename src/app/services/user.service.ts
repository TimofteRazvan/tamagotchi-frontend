import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
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

    getStatus(id: number) : Observable<Status> {
        return this.http.get<Status>(`${this.url}/home/${id}`)
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