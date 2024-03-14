import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Runner } from '../../../common/thirdparties/typeorm/run.in.transaction';
import {
  CreateUserRequestDto,
  ListUserRequestDto,
  UpdateUserRequestDto,
} from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from './user.repo.interface';
import { UserType } from '../../../common/enum/user.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private dataSource: DataSource) {}

  async createUser(
    request: CreateUserRequestDto,
    rn?: Runner,
  ): Promise<UserEntity> {
    try {
      let em = this.dataSource.manager;
      if (rn) em = rn.manager;

      const query = await em.getRepository(UserEntity).save(request);

      return query;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findUserByEmail(email: string, rn?: Runner): Promise<UserEntity> {
    try {
      let em = this.dataSource.manager;
      if (rn) em = rn.manager;

      const query = await em
        .createQueryBuilder()
        .select(['users.id', 'users.user_type'])
        .from(UserEntity, 'users')
        .where('users.email = :email', { email: email })
        .andWhere('users.deleted_at IS NOT NULL')
        .getOne();

      return query;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUser(
    request: UpdateUserRequestDto,
    rn?: Runner,
  ): Promise<UserEntity> {
    try {
      let em = this.dataSource.manager;
      if (rn) em = rn.manager;

      await em
        .createQueryBuilder()
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          password: request.user.password,
          skill: request.user.skill,
          phone: request.user.phone,
          location: request.user.location,
        })
        .where('id = :id', { id: request.user.id }).execute;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async activateEmail(id: string, rn?: Runner): Promise<void> {
    try {
      let em = this.dataSource.manager;
      if (rn) em = rn.manager;

      await em
        .createQueryBuilder()
        .update(UserEntity)
        .set({ user_type: UserType.Candidate })
        .where('id = :id', { id: id }).execute;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUser(id: string, rn?: Runner): Promise<void> {
    try {
      let em = this.dataSource.manager;
      if (rn) em = rn.manager;

      await em
        .createQueryBuilder()
        .update(UserEntity)
        .set({ deleted_by: id, deleted_at: new Date() })
        .where('id = :id', { id: id }).execute;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async listUser(
    request: ListUserRequestDto,
    rn?: Runner,
  ): Promise<[UserEntity[], number]> {
    try {
      let em = this.dataSource.manager;
      if (rn) em = rn.manager;

      const { page, limit, sort_by, sort_type, search } = request;

      const offset = (page - 1) * limit;

      const query = await em
        .createQueryBuilder()
        .select('*')
        .from(UserEntity, 'users')
        .where('users.deleted_by IS NULL');

      const totalData = query.getCount();
      const listUser = query
        .orderBy(sort_by, sort_type)
        .limit(limit)
        .offset(offset)
        .getRawMany();

      return Promise.all([listUser, totalData]);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
