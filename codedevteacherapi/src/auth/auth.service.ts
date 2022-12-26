import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { passwordHashed } from 'src/commons/functions/passwordHashed';
import { passwordVerify } from 'src/commons/functions/passwordVerify';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }



    async validateUser(username, pass) {
        const user = await this.usersService.findOne(username);
        if (!_.isEmpty(user)) {
            const verifyPassword = await passwordVerify(pass, user.password);
            if (verifyPassword) {
                const copyUser = _.cloneDeep(user);
                delete copyUser.password;
                return copyUser;
            }
        }
        return null;
    }


    async login(user: any) {
        const payload = {
            username: user.username,
            userId: user.userId,
            ROLES: user.ROLES
        };
        return {
            access_token: this.jwtService.sign(payload),
        };

        // return user;
    }
}
