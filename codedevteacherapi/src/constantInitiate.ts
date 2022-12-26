import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: process.env.CUSTOM_ENV });

export let JWT_SECRET_KEY;
export let APP_PORT;
export let MONGODB_URL;
export let MONGODB_DATABASE;

const constantInitiate = () => {

    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    APP_PORT = process.env.APP_PORT;
    MONGODB_DATABASE = process.env.MONGODB_DATABASE;
    MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@codedevteacher1.bburogu.mongodb.net/?retryWrites=true&w=majority`;
};

export const  whiteLabeledDomains = [
    'local.codevteacher.com',
    'dev.admin.codevteacher.com',
    'prd.admin.codevteacher.com',
    'test.admin.codevteacher.com'
];




export default constantInitiate;
