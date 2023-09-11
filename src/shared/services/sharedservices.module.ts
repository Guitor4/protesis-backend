/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SendEmailService } from './sendemail.service';

@Module({
    imports: [],
    controllers: [],
    providers: [SendEmailService],
    exports: [SendEmailService]
})
export class SharedServicesModule {}
