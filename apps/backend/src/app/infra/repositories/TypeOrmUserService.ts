import { Repository } from "typeorm";
import { UserEntity } from "../db/entities/UserEntity.js";
import type { UserService } from "../../../../../../domain/src/services/UserService.js";
import type { User } from "../../../../../../domain/src/entities/User.js";

export class TypeOrmUserService implements UserService {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  private toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    Object.assign(entity, user);
    entity.orders = [];
    return entity;
  }

  async findById(id: string): Promise<User | undefined> {
    const entity = await this.userRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : undefined;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const entity = await this.userRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : undefined;
  }

  async findByName(name: string): Promise<User | undefined> {
    const entity = await this.userRepository.findOne({ where: { name } });
    return entity ? this.toDomain(entity) : undefined;
  }

  async save(user: User): Promise<User> {
    const entity = this.toEntity(user);
    const saved = await this.userRepository.save(entity);
    return this.toDomain(saved);
  }

  async editOne(user: User): Promise<User> {
    const entity = this.toEntity(user);
    const saved = await this.userRepository.save(entity);
    return this.toDomain(saved);
  }

  async updateMany(users: User[]): Promise<User[] | undefined> {
    const entities = users.map((u) => this.toEntity(u));
    const saved = await this.userRepository.save(entities);
    return saved.map((e) => this.toDomain(e));
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
