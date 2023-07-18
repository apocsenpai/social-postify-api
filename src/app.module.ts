import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PublicationsModule],
})
export class AppModule {}
