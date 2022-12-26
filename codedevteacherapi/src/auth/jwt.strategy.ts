import { ExtractJwt, Strategy } from 'passport-jwt';
import passportCustom from 'passport-custom';
const CustomStrategy = passportCustom.Strategy;
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import * as _ from 'lodash';
import { JWT_SECRET_KEY } from 'src/constantInitiate';

@Injectable()
export class JwtStrategy extends PassportStrategy(CustomStrategy) {
    constructor() {
        super();
    }

    private readonly logger = new Logger(JwtStrategy.name);

    async validate(req: any, context: ExecutionContext) {
        // this.logger.log('validate user jwt');
        const TokenArray = req?.headers?.authorization?.split(' ');
        const token = _.size(TokenArray) == 2 ? TokenArray[1] : '';
        if (!token?.length) {
            this.logger.error('token is wrong');
            return false;
        }

        const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
        if (_.size(decoded?.ROLES) == 0) {
            const message = 'there is no roles in token';
            this.logger.error(message);
            throw new UnauthorizedException(message);
        }
        if (!decoded?.username) {
            const message = 'there is no user name';
            this.logger.error(message);
            throw new UnauthorizedException(message);
        }
        req.ROLES = decoded?.ROLES;
        return decoded;
    }
}
