export class Status {
    hunger!: number;
    happiness!: number;
    cleanliness!: number;
    age!: number;

    constructor(hunger: number, happiness: number, cleanliness: number, age: number) {
        this.hunger = hunger;
        this.happiness = happiness;
        this.cleanliness = cleanliness;
        this.age = age;
    }
}