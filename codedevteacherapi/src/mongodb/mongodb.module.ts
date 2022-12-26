import { Global, Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongoClient, Db } from 'mongodb';
import { MONGODB_DATABASE, MONGODB_URL } from 'src/constantInitiate';


const moduleObj = {
    providers: [
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: async (): Promise<Db> => {
                try {
                    const client = await MongoClient.connect(
                        MONGODB_URL,
                        {
                            ssl: true,
                            minPoolSize: 1,
                            maxPoolSize: 120,
                            // maxIdleTimeMS: 8000,
                            // waitQueueTimeoutMS: 1000,
                        },
                    );

                    return client.db(MONGODB_DATABASE);
                } catch (e) {
                    const error = e;
                    throw error;
                }
            },
        },
        MongodbService,
    ],
    exports: ['DATABASE_CONNECTION', MongodbService],
};

@Global()
@Module(moduleObj)
export class MongodbModule { }
