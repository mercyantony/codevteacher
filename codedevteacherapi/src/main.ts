import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import constantInitiate, { APP_PORT, JWT_SECRET_KEY, whiteLabeledDomains } from './constantInitiate';
constantInitiate();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    app.enableCors({
        origin: function (origin, callback) {

            const urlSchema = new URL(origin || 'http://xyz');
            const hostname = urlSchema?.hostname;
            const result = whiteLabeledDomains.indexOf(hostname) ;
            if (whiteLabeledDomains.indexOf(hostname) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    });
    const port: any = APP_PORT || 8409;
    await app.listen(parseInt(port));
}

// setTimeout(() => {

// }, 1000);
bootstrap();
// TODO: Delete this
// console.log(JWT_SECRET_KEY);

