import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    private readonly logger = new Logger(RolesGuard.name);

    canActivate(context: ExecutionContext): boolean {
        // this.logger.log('canActivate');3
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            this.logger.log('canActivate there is no role specified');
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const requestRoles = request.ROLES;
        if (_.isEmpty(requestRoles)) {
            this.logger.error('canActivate there is no role specified and can not continue');
            return false;
        }
        let result = false;
        requestRoles.map((role) => {
            if (roles.includes(role)) {
                result = true;
            }
        });
        return result;
    }
}
