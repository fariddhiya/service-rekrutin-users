import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  ActivateUserRequest,
  ActivateUserResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  ListUserRequest,
  ListUserResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  User,
  UserList,
} from '../protobuf/user.pb';
import { SortType } from '../../../common/enum/user.enum';
import { Transform } from 'class-transformer';
import { Pagination } from '../../../common/response';

class UserDto implements User {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  token: string;

  @IsString()
  user_type: number;

  @IsArray()
  skill: string[];
  image: string;

  @IsString()
  phone: string;

  @IsString()
  location: string;
}

export class CreateUserRequestDto implements CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserResponseDto implements CreateUserResponse {
  message: string;
  id: string;
}

export class UpdateUserRequestDto implements UpdateUserRequest {
  user: User;
}

export class UpdateUserResponseDto implements UpdateUserResponse {
  message: string;
  user: User;
}

export class ActivateUserRequestDto implements ActivateUserRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ActivateUserResponseDto implements ActivateUserResponse {
  message: string;
}

export class DeleteUserRequestDto implements DeleteUserRequest {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeleteUserResponseDto implements DeleteUserResponse {
  message: string;
}

export class ListUserRequestDto implements ListUserRequest {
  @Max(100)
  @Min(1)
  limit: number = 10;

  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(SortType)
  sort_type: SortType = SortType.Desc;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  sort_by: string = 'id';

  @IsOptional()
  search: string;
}

export class ListUserResponseDto implements ListUserResponse {
  message: string;
  user: UserList[];
  pagination: Pagination;
}

export class ResetPasswordRequestDto implements ResetPasswordRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}
