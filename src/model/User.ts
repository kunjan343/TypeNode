export class User {
    constructor(private username: string,
                private password: string,
                private id?: string) {
    }

    get getUsername(): string {
        return this.username;
    }

    get getPassword(): string {
        return this.password;
    }

    get getId(): string {
        return this.id;
    }
}
