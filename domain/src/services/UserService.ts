  import type { User } from "../entities/User.js";
  import type { Service } from "../utils/types/Service.js";

  export interface UserService extends Service<User> {
    findByName: (name: string) => Promise<User | undefined>;
    findByEmail: (email: string) => Promise<User | undefined>;
  }
