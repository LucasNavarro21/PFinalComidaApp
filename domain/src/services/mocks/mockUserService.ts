import { randomUUID } from "crypto";
import { UserStatus, type User } from "../../entities/User.js";
import type { UserService } from "../UserService.js";

export class MockedUserService implements UserService {
  private users: User[] = [];

  constructor(initialUsers: User[] = []) {
    this.users = initialUsers;
  }

  findAll = async () => this.users;

  findById = async (id: string) => this.users.find(u => u.id === id);

  findByName = async (name: string) => this.users.find(u => u.name === name);

  findByEmail = async (email: string) => this.users.find(u => u.email === email);


    async save(data: User): Promise<User> {
    const newUser: User = {
      ...data,
      id: randomUUID(),
      status: data.status || "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
    }

  editOne = async (data: User) => {
    const index = this.users.findIndex(u => u.id === data.id);
    if (index === -1) throw new Error("User not found");
    this.users[index] = { ...data, updatedAt: new Date() };
    return this.users[index];
  };

  updateMany = async (data: User[]) => {
    data.forEach(updatedUser => {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = { ...updatedUser, updatedAt: new Date() };
      }
    });
    return this.users;
  };

  delete = async (id: string) => {
    this.users = this.users.filter(u => u.id !== id);
  };
}
