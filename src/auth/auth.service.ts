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

    async login(dto: LoginDto): Promise<{ userId: number; token: string }> {
        const user = await this.userRepo.findOne({
            where: { username: dto.username },
        });

        if (!user) throw new UnauthorizedException();

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException();

        return {
            userId: user.id,
            token: this.jwtService.sign({ userId: user.id }),
        };
    }

    async selectRole(body: { userId: number; roleId: number }): Promise<{ token: string }> {
        return {
            token: this.jwtService.sign({
                userId: body.userId,
            }),
        };
    }
}