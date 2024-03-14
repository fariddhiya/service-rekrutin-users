import { Inject, Injectable } from '@nestjs/common';
import {
  ActivateUserRequestDto,
  ActivateUserResponseDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  DeleteUserRequestDto,
  DeleteUserResponseDto,
  ListUserRequestDto,
  ListUserResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '../dtos/user.dto';
import { IUserService } from './user.service.interface';
import { DataSource } from 'typeorm';
import { IUserRepository } from '../repositories/user.repo.interface';
import { OKMessage } from '../../../common/consts/ok.code';
import { ErrorMessage } from '../../../common/consts/status.code';
import { UserType } from '../../../common/enum/user.enum';
import { Pagination } from '../../../common/response';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async createUser(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const emailIsExist = await this.userRepo.findUserByEmail(request.email);
    console.log(emailIsExist);

    if (emailIsExist) {
      throw new Error(ErrorMessage.EmailIsExist);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(request.password, salt);

    const requestSalted = {
      ...request,
      password: passwordHash,
    };

    const data = await this.userRepo.createUser(requestSalted);

    if (!data) {
      throw new Error(ErrorMessage.Error);
    }

    return {
      message: OKMessage.Success,
      id: data.id,
    };
  }

  async updateUser(
    request: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    try {
      const user = await this.userRepo.findUserByEmail(request.user.email);

      if (user.user_type == UserType.Blocked) {
        throw new Error(ErrorMessage.EmailIsBlocked);
      }

      if (user.user_type == UserType.NotActive) {
        throw new Error(ErrorMessage.EmailIsNotActivated);
      }

      await this.userRepo.updateUser(request);

      return {
        message: OKMessage.Success,
        user: request.user,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async activateUser(
    request: ActivateUserRequestDto,
  ): Promise<ActivateUserResponseDto> {
    try {
      const user = await this.userRepo.findUserByEmail(request.email);

      if (user.user_type == UserType.Blocked) {
        throw new Error(ErrorMessage.EmailIsBlocked);
      }

      if (user.user_type !== UserType.NotActive) {
        throw new Error(ErrorMessage.EmailIsActivated);
      }

      await this.userRepo.activateEmail(user.id);

      return { message: OKMessage.Success };
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUser(
    request: DeleteUserRequestDto,
  ): Promise<DeleteUserResponseDto> {
    try {
      await this.userRepo.deleteUser(request.id);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async listUser(request: ListUserRequestDto): Promise<ListUserResponseDto> {
    try {
      const pagination = new Pagination();

      const [listUser, totalData] = await this.userRepo.listUser(request);

      if (listUser.length === 0) {
        return {
          message: OKMessage.Success,
          pagination: pagination,
          user: [],
        };
      }

      /** Set Pagination */
      pagination.page = request.page;
      pagination.page_size = request.limit;
      pagination.total_page = Math.ceil(totalData / request.limit);
      pagination.total_records = totalData;

      const dataUser = listUser.map((value) => {
        return {
          ...value,
          skill: value.skill.split(', '),
          created_at: value.created_at.toDateString(),
        };
      });

      return {
        message: OKMessage.Success,
        pagination: pagination,
        user: dataUser,
      };

      // return {
      //   message: OKMessage.Success,
      //   pagination: pagination,
      //   user: {
      //     ...listUser,
      //     skill: skill,
      //   },
      // };
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
