import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  age: number;
}

// Dependency Injection
// Ready to be injected into a controller or a module but you need to add in module.ts providers array to make it available
@Injectable()
export class Store {
  constructor() {
    console.log('Store constructor');
  }
  private store: Map<string, User> = new Map();

  addUser(user: User) {
    this.store.set(user.id, user);
  }

  getUser(id: string) {
    return this.store.get(id);
  }

  getUsers() {
    return Array.from(this.store).map(([_, user]) => user);
  }

  updateUser(id: string, user: User) {
    this.store.set(id, user);
  }

  deleteUser(id: string) {
    this.store.delete(id);
  }
}
