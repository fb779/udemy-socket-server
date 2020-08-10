import { User } from './user';

export class AdminUsers {
  private list: User[] = [];

  constructor() {}

  addUser(user: User) {
    this.list.push(user);
    return user;
  }

  updateName(id: string, name: string) {
    for (const us of this.list) {
      if (us.id === id) {
        us.name = name;
        break;
      }
    }

    console.log('Usuarios', this.list);
  }

  getList() {
    return this.list;
  }

  getUser(id: string) {
    return this.list.find((us) => us.id === id);
  }

  getUserRoom(room: string) {
    return this.list.filter((us) => us.room === room);
  }

  deleteUser(id: string) {
    let userTem = this.getUser(id);
    this.list = this.list.filter((us) => us.id !== id);
    return userTem;
  }
}
