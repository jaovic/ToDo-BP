import { Injectable } from '@nestjs/common';
import { SingUpAuthDto } from '../dto/singup-auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { IAuthRepository } from '../structure/IRepository.structure';

@Injectable()
export class AuthRepository implements IAuthRepository{
  constructor(private prisma: PrismaService){}
  async create(createAuthDto: SingUpAuthDto): Promise<Partial<User>> {
    try {
      createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: createAuthDto.name,
          email: createAuthDto.email,
          password: createAuthDto.password,
          phone: createAuthDto.phone
      }});
      delete user.password
      delete user.token
      delete user.Refresh_Token
      delete user.codeSms
      delete user.isVerified      
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  
  }
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }
  
  async findById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async findByRefreshToken(refreshToken: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { Refresh_Token: refreshToken },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<number> {
    try {
      const result: Prisma.BatchPayload =  await this.prisma.user.updateMany({
        where: {
          id,
        },
        data: { Refresh_Token: refreshToken },
      });
      return result.count;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async updateToken(id: string, token: string): Promise<number> {
    try {
      const result: Prisma.BatchPayload =  await this.prisma.user.updateMany({
        where: { id },
        data: { token },
      });
      return result.count;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async logout(userId: string): Promise<true> {
    try {
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          Refresh_Token: {
            not: 'null',
          },
        },
        data: {
          Refresh_Token: 'null',
        },
      });
      return true;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async saveCode(id: string, code: string): Promise<number> {
    try {
      const result: Prisma.BatchPayload = await this.prisma.user.updateMany({
        where: {
          id,
        },
        data: {
          codeSms: code,
        },
      });
      return result.count;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async verifyCode(id: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (user.isVerified === false) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async updateCode(id: string): Promise<number> {
    try {
      const result: Prisma.BatchPayload = await this.prisma.user.updateMany({
        where: {
          id,
        },
        data: {
          codeSms: 'verificated',
          isVerified: true,
        },
      });
      return result.count;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }
}