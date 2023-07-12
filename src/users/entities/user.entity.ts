import { randomUUID } from 'crypto';

export class User {
  constructor(
    private readonly _id: string = randomUUID(),
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _avatar: string,
    private readonly _createdAt: Date = new Date(),
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get avatar(): string {
    return this._avatar;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
