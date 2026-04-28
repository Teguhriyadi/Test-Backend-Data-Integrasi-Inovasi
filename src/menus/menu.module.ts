import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Menu } from "./menu.entity";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    JwtModule.register({}),
  ],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService]
})
export class MenuModule {}