// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 Importe TypeOrmModule
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from '../users/entities/user.entity'; // 👈 Importe sua UserEntity

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // 👈 Registre o repositório para UserEntity
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporte o serviço para que outros módulos possam usá-lo
})
export class UsersModule {}