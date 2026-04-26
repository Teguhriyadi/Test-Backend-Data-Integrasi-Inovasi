import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { RolesModule } from './roles/role.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { MenuModule } from './menus/menu.module';
import { Role } from './roles/role.entity';
import { UserRole } from './user-roles/user-roles.entity';
import { Menu } from './menus/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'teguhriyadi2909',
      password: '',
      database: 'db_test_be',
      autoLoadEntities: true,
      entities: [User, Role, UserRole, Menu],
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    UserRolesModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
