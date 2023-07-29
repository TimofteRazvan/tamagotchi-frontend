export class User {
    id!: number;
    username!: string;
    password!: string;
    tamagotchiName!: string;
    tamagotchiSpecies!: string;

    constructor(username: string, password:string, id: number = 0, tamagotchiName: string = "", tamagotchiSpecies: string = "") {
        this.id = id;
        this.username = username;
        this.password = password;
        this.tamagotchiName = tamagotchiName;
        this.tamagotchiSpecies = tamagotchiSpecies;
    }
}