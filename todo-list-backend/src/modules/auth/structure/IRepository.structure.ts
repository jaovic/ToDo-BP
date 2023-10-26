import { User } from '@prisma/client';

export interface ICreateUserRpository {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export interface IAuthRepository {
  create(createAuthDto: ICreateUserRpository): Promise<Partial<User>>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByRefreshToken(refreshToken: string): Promise<User>;
  updateRefreshToken(id: string, refreshToken: string): Promise<number>;
  saveCode(id: string, code: string): Promise<number>;
  verifyCode(id: string): Promise<boolean>;
  updateToken(id: string, token: string): Promise<number>;
  logout(userId: string): Promise<true>;
  updateCode(id: string): Promise<number>;
}
