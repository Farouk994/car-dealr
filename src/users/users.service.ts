import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    // create() creates new instance of the user entity
    // Then we will save it to db after verification
    const user = this.repo.create({ email, password });

    // save() Used for actual persistance to db
    // If we just pass in the object for email and password then hooks wont be
    // executed, meaning we wont know if there are bugs or anything
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new Error('user not found!');
    // This method will get the value we have in attrs that was updated from the user
    // entity and assign it to the user
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error('user not found');
    return this.repo.remove(user);
  }
}
