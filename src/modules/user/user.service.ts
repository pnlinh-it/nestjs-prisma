import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async create(createUser: CreateUserDto) {
    const existUser = await this.prismaService.user.findFirst({
      where: { email: createUser.email },
    });

    if (existUser) {
      throw new UnprocessableEntityException('Email is already exist.');
    }

    const userPayload: Prisma.UserCreateInput = {
      email: createUser.email,
      name: createUser.name,
      profile: {
        create: {
          nickname: createUser.nickname,
        },
      },
    };

    return this.prismaService.user.create({ data: userPayload });
  }

  async update(userId: number, updateUser: UpdateUserDto) {
    await this.prismaService.user.findUnique({
      select: { id: true },
      where: { id: userId },
      rejectOnNotFound: true,
    });

    const email = updateUser.email;
    if (email) {
      const existUser = await this.prismaService.user.findFirst({
        where: {
          email: email,
          id: {
            not: userId,
          },
        },
      });

      if (existUser) {
        throw new UnprocessableEntityException('Email is already exist.');
      }
    }

    return this.prismaService.user.update({
      where: { id: userId },
      data: { email: updateUser.email, name: updateUser.name },
    });
  }

  show(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      rejectOnNotFound: true,
    });
  }

  delete(userId: number) {
    return this.prismaService.user.delete({ where: { id: userId } });
  }
}
