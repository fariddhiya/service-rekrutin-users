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

export interface IUserService {
  /**
   * Find one data promo based on promo_id
   *
   * @param promo_id - id from table promo
   * @returns object promo entity
   */
  createUser(request: CreateUserRequestDto): Promise<CreateUserResponseDto>;

  updateUser(request: UpdateUserRequestDto): Promise<UpdateUserResponseDto>;

  activateUser(
    request: ActivateUserRequestDto,
  ): Promise<ActivateUserResponseDto>;

  deleteUser(request: DeleteUserRequestDto): Promise<DeleteUserResponseDto>;

  listUser(request: ListUserRequestDto): Promise<ListUserResponseDto>;
}

export const IUserService = Symbol('IUserService');
