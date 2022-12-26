import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import projectionObj from '../commons/functions/projectionObj';

const {
    ObjectId,
} = require('mongodb');


export type User = any;



@Injectable()
export class UsersService {

    constructor(
        private mongodbService: MongodbService,
    ) { }


    async findOne(username) {

        // const result = this.users.find((user) => {
        //     return user.username === username;
        // });
        const result = await this.findUserByUsername(username);
        return result;
    }


    async findAll() {
        const result = await this.mongodbService.usersCol.find({}).project({
            userId: 1,
            username: 1,
            ROLES: 1,
        }).toArray();
        return result;
    }


    async findUserBy_id(stirng_id) {
        const result = await this.mongodbService.usersCol.findOne(
            {
                _id: ObjectId(stirng_id)
            }
        );
        const project = {
            _id: 1,
            userId: 1,
            username: 1,
            ROLES: 1,
        };
        // projectionObj
        return projectionObj(result, project);
    }



    async findUserByUsername(username) {
        const result = await this.mongodbService.usersCol.findOne({
            username
        });
        return result;
    }


    async searchUsers(req) {
        // this.logger.log('<searchUsers>');

        // eslint-disable-next-line no-useless-catch
        try {
            const page = req?.body?.page || 1;
            const portionOfPage = req?.body?.portionOfPage || 50;
            const skip = page > 0 ? (page - 1) * portionOfPage : 0;
            const sort = req?.body?.sort || { timestamp: -1 };
            const sortObj = {};
            const sortDirection = req?.body?.sortDirection || 1;
            sortObj[sort] = sortDirection;
            const find = req?.body?.find || {};

            const query = await this.mongodbService.usersCol
                .find(find)
                .sort(sortObj)
                .skip(skip)
                .limit(portionOfPage)
                .toArray();


            const resultObj = {
                data: query,
            };
            if (!req?.body?.noCount) {

                const count = await this.mongodbService.usersCol
                    .countDocuments(find);
                resultObj['count'] = count;
            }
            return resultObj;
        }
        catch (error) {
            // this.logger.error('<searchUsers> ' + error.message, error.stack);
            throw error;
        }
    }

}
