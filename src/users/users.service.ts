import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseResponse } from 'src/common/dto/base-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<BaseResponse<User>> {
        const existing = await this.userRepo.findOne({
            where: { username: dto.username },
        });

        if (existing) {
            throw new BadRequestException('Username sudah digunakan');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.userRepo.create({
            username: dto.username,
            password: hashedPassword,
        });

        const saved = await this.userRepo.save(user);

        return {
            statusCode: 201,
            message: 'User berhasil dibuat',
            data: saved,
        };
    }

    async findAll(): Promise<BaseResponse<User[]>> {
        const users = await this.userRepo.find();

        return {
            statusCode: 200,
            message: 'List user berhasil diambil',
            data: users,
        };
    }

    async findOne(id: number): Promise<BaseResponse<User>> {
        const user = await this.userRepo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        return {
            statusCode: 200,
            message: 'Detail user berhasil diambil',
            data: user,
        };
    }

    async update(id: number, dto: UpdateUserDto): Promise<BaseResponse<User>> {
        const user = await this.userRepo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }

        Object.assign(user, dto);

        const updated = await this.userRepo.save(user);

        return {
            statusCode: 200,
            message: 'User berhasil diupdate',
            data: updated,
        };
    }

    async remove(id: number): Promise<BaseResponse<null>> {
        const user = await this.userRepo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        await this.userRepo.remove(user);

        return {
            statusCode: 200,
            message: 'User berhasil dihapus',
            data: null,
        };
    }
}