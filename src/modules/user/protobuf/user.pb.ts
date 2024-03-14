/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface User {
  id: string;
  email: string;
  password: string;
  token: string;
  user_type: number;
  skill: string[];
  image: string;
  phone: string;
  location: string;
}

export interface UserList {
  id: string;
  email: string;
  password: string;
  token: string;
  user_type: number;
  skill: string[];
  image: string;
  phone: string;
  location: string;
  created_at: string;
}

export interface Pagination {
  page: number;
  page_size: number;
  total_page: number;
  total_records: number;
}

export interface CreateUserRequest {
  email: string;
  password: string;
}

export interface CreateUserResponse {
  message: string;
  id: string;
}

export interface UpdateUserRequest {
  user: User | undefined;
}

export interface UpdateUserResponse {
  message: string;
  user: User | undefined;
}

export interface ActivateUserRequest {
  email: string;
}

export interface ActivateUserResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  password: string;
}

export interface ListUserRequest {
  limit: number;
  page: number;
  sort_type: string;
  sort_by: string;
  search: string;
}

export interface ListUserResponse {
  message: string;
  user: UserList[];
  pagination: Pagination | undefined;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  message: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  message: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;

  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;

  activateUser(request: ActivateUserRequest): Observable<ActivateUserResponse>;

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse>;

  listUser(request: ListUserRequest): Observable<ListUserResponse>;

  loginUser(request: LoginUserRequest): Observable<LoginUserResponse>;

  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  updateUser(
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> | Observable<UpdateUserResponse> | UpdateUserResponse;

  activateUser(
    request: ActivateUserRequest,
  ): Promise<ActivateUserResponse> | Observable<ActivateUserResponse> | ActivateUserResponse;

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> | Observable<ResetPasswordResponse> | ResetPasswordResponse;

  listUser(request: ListUserRequest): Promise<ListUserResponse> | Observable<ListUserResponse> | ListUserResponse;

  loginUser(request: LoginUserRequest): Promise<LoginUserResponse> | Observable<LoginUserResponse> | LoginUserResponse;

  deleteUser(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "updateUser",
      "activateUser",
      "resetPassword",
      "listUser",
      "loginUser",
      "deleteUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
