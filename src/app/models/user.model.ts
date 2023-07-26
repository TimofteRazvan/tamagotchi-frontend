export class User {
    id!: number;
    username!: string;
    password!: string;
    tamagotchi!: string;

    constructor(username: string, password:string, id: number = 0, tamagotchi: string = "") {
        this.id = id;
        this.username = username;
        this.password = password;
        this.tamagotchi = tamagotchi;
    }
}