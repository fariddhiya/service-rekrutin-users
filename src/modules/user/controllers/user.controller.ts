import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { IUserService } from '../services/user.service.interface';
import { Response } from '../../../common/response';
import { DeleteUserRequest, USER_SERVICE_NAME } from '../protobuf/user.pb';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  DeleteUserRequestDto,
  DeleteUserResponseDto,
  ListUserRequestDto,
  ListUserResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '../dtos/user.dto';
import { SuperLogger } from '../../../common/logger/logger.service';
import { OKMessage } from '../../../common/consts/ok.code';

@Controller()
export class UserController {
  constructor(
    private readonly logger: SuperLogger,
    @Inject(IUserService) private userService: IUserService,
  ) {}

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  async createUser(
    @Payload() request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    //Call main function
    const result = await this.userService.createUser(request);

    //logging
    this.logger.log(0, 'gRPC', 'CreateUser', OKMessage.Success, 'info', {
      body: request,
      method: 'gRPC Method',
      url: 'User/createBulkVoucher',
      headers: undefined,
    });

    return result;
  }

  @GrpcMethod(USER_SERVICE_NAME, 'UpdateUser')
  async updateUser(
    @Payload() request: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const result = await this.userService.updateUser(request);

    //logging
    this.logger.log(0, 'gRPC', 'UpdateUser', OKMessage.Success, 'info', {
      body: request,
      method: 'gRPC Method',
      url: 'User/UpdateUser',
      headers: undefined,
    });

    return result;
  }

  @GrpcMethod(USER_SERVICE_NAME, 'ActivateUser')
  async activateUser(
    @Payload() request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    //Call main function
    const result = await this.userService.createUser(request);

    //logging
    this.logger.log(0, 'gRPC', 'ActivateUser', OKMessage.Success, 'info', {
      body: request,
      method: 'gRPC Method',
      url: 'User/activateUser',
      headers: undefined,
    });

    return result;
  }

  @GrpcMethod(USER_SERVICE_NAME, 'DeleteUser')
  async deleteUser(
    @Payload() request: DeleteUserRequestDto,
  ): Promise<DeleteUserResponseDto> {
    const result = await this.userService.deleteUser(request);

    //logging
    this.logger.log(0, 'gRPC', 'DeleteUser', OKMessage.Success, 'info', {
      body: request,
      method: 'gRPC Method',
      url: 'User/DeleteUser',
      headers: undefined,
    });

    return result;
  }

  @GrpcMethod(USER_SERVICE_NAME, 'ListUser')
  async ListUser(
    @Payload() request: ListUserRequestDto,
  ): Promise<ListUserResponseDto> {
    const result = await this.userService.listUser(request);

    //logging
    this.logger.log(0, 'gRPC', 'DeleteUser', OKMessage.Success, 'info', {
      body: request,
      method: 'gRPC Method',
      url: 'User/DeleteUser',
      headers: undefined,
    });

    return result;
  }

  // @GrpcMethod(USER_SERVICE_NAME, 'ResetPassword')
  // async resetPassword(
  //   @Payload() request: ListUserRequestDto,
  // ): Promise<ListUserResponseDto> {
  //   // const result = await this.userService.resetPassword(request);

  //   //logging
  //   this.logger.log(0, 'gRPC', 'ResetPassword', OKMessage.Success, 'info', {
  //     body: request,
  //     method: 'gRPC Method',
  //     url: 'User/ResetPassword',
  //     headers: undefined,
  //   });

  //   return result;
  // }
}
