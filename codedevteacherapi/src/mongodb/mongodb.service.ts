import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class MongodbService {

    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db
    ) {

    }


    private readonly logger = new Logger(MongodbService.name);

    usersCol;


    onModuleInit() {

        // setTimeout(() => {
        //     debugger;

        // }, 1000);
        this.logger.log('onModuleInit firs time');
        this.initialDb();
        // this.fix4Db();
        // mongodbServiceExport = { service: this };
        // servicesShare().mongodbService = this;

        // // setInterval(async () => {
        // //     const ssss = await this.db?.stats();
        // //     this.logger.log(ssss);
        // // }, 60000);
    }

    initialDb() {

        this.usersCol = this.db.collection('users');
        // setTimeout(()=> {
        //     // this.usersCol.createIndex({ email: 1 }, { background: true, unique: true });
        //     // debugger;
        // }, 200);
        //
    }

}
