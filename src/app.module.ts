import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/role.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { MenuModule } from './menus/menu.module';

import { User } from './users/users.entity';
import { Role } from './roles/role.entity';
import { UserRole } from './user-roles/user-roles.entity';
import { Menu } from './menus/menu.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        entities: [User, Role, UserRole, Menu],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    UserRolesModule,
    MenuModule,
  ],
})
export class AppModule { }