import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRole } from "./user-roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
})
export class UserRolesModule {}