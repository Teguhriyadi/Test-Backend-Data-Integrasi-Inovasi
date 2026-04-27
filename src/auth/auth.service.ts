import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async login(dto: LoginDto): Promise<any> {
        const user = await this.userRepo.findOne({
            where: { username: dto.username },
            relations: ['userRoles', 'userRoles.role'],
        });

        if (!user) {
            throw new UnauthorizedException('User tidak ditemukan');
        }

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) {
            throw new UnauthorizedException('Password salah');
        }

        return {
            statusCode: 200,
            message: 'Login berhasil',
            data: {
                userId: user.id,
                roles: (user.userRoles || []).map((ur) => ({
                    role_id: ur.role.id,
                    role_name: ur.role.name,
                })),
            },
        };
    }

    async selectRole(body: { userId: number; roleId: number }) {
        const user = await this.userRepo.findOne({
            where: { id: body.userId },
            relations: ['userRoles', 'userRoles.role'],
        });

        if (!user) {
            throw new UnauthorizedException('User tidak ditemukan');
        }

        const hasRole = (user.userRoles || []).find(
            (ur) => ur.role.id === body.roleId,
        );

        if (!hasRole) {
            throw new UnauthorizedException('Role tidak valid');
        }

        const payload = {
            userId: user.id,
            roleId: body.roleId,
        };

        return {
            statusCode: 200,
            message: 'Login role berhasil dipilih',
            data: {
                access_token: this.jwtService.sign(payload),
            },
        };
    }
}