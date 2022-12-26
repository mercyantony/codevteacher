import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LocalStrategy } from 'src/auth/local.strategy';

@Global()
@Module({
    providers: [UsersService, LocalStrategy],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
