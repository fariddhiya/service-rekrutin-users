import { Runner } from '../../../common/thirdparties/typeorm/run.in.transaction';
import {
  CreateUserRequestDto,
  ListUserRequestDto,
  UpdateUserRequestDto,
} from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * Find many promo product based on promo_ids
   * with table : promo_products
   *
   * @param promo_ids - promo_ids
   * @param rn - optional use transaction
   *
   * @implements findPromoProductByPromoIds - get many promo product, based on promo_ids
   * @implements _checkPromoItem -  get one promo product, based on promo_id
   * @implements promoByCustomer - get many list voucher/promo based on customer_id
   */
  createUser(request: CreateUserRequestDto, rn?: Runner): Promise<UserEntity>;

  updateUser(request: UpdateUserRequestDto, rn?: Runner): Promise<UserEntity>;

  findUserByEmail(email: string, rn?: Runner): Promise<UserEntity>;

  activateEmail(id: string, rn?: Runner): Promise<void>;

  deleteUser(id: string, rn?: Runner): Promise<void>;

  listUser(request: ListUserRequestDto): Promise<[UserEntity[], number]>;
}

export const IUserRepository = Symbol('IUserRepository');
