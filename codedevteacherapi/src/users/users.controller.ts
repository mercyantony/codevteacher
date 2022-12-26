import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Public } from 'src/commons/decorators/Public.decorator';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }


    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }


    @Roles('TEACHER', 'SUPER_TEACHER')
    @Post('/findAllUsers')
    async findAllUsers(@Request() req) {
        debugger;

        const findAllUsersArray = await this.usersService.findAll();
        return findAllUsersArray;
    }


    @Roles('SUPER_TEACHER')
    @Post('/findOneUserBy_id')
    async findOneUserBy_id(@Request() req) {

        const { stirng_id } = req.body;

        const result = await this.usersService.findUserBy_id(stirng_id);
        return result;

    }


    // @UseGuards(JwtAuthGuard)
    // @Post('/searchUsers')
    // async searchUsers(@Request() req) {

    //     const { stirng_id } = req.body;

    //     const result = await this.usersService.findUserBy_id(stirng_id);
    //     return result;

    // }


    @Roles(
        'SUPER_TEACHER',
        'TEACHER',
        'STUDENT',
        'TA',
    )
    @Post('/validateToken')
    async validateToken(@Request() req) {
        return {
            message: 'OK'
        };
    }




}
