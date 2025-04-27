import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  name: string;
  age: number;
}

@Injectable()
export class UsersService {
  private store: Map<string, User> = new Map();

  addUser(user: User) {
    this.store.set(user.id, user);
    return { message: 'USER ADDED' };
  }

  getUser(id: string) {
    return this.store.get(id);
  }

  getUsers() {
    return Array.from(this.store).map(([_, user]) => user);
  }

  updateUser(id: string, user: User) {
    this.store.set(id, user);
    return { message: 'USER UPDATED' };
  }

  deleteUser(id: string) {
    this.store.delete(id);
    return { message: 'USER DELETED' };
  }
}
