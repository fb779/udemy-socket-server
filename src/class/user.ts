export class User {
  public id: String;
  public name: String;
  public room: String;

  constructor(id: string) {
    this.id = id;
    this.name = 'No-Name';
    this.room = 'No-Room';
  }

  setName(name: string) {
    this.name = name;
  }

  setRoom(room: string) {
    this.room = room;
  }
}
