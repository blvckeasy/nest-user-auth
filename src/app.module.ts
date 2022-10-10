import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ScheduleModule } from '@nestjs/schedule'

// import app configuration
import configuration from './config/configuration'

// modules
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ContactBanModule } from './ContactBan/contactBan.module';
import { ContactAttempModule } from './contactAttemp/contactAttemp.module';

// models
import { User } from './users/users.model'
import { ContactBan } from './ContactBan/contactBan.model'
import { ContactAttemp } from './contactAttemp/contactAttemp.model'


@Module({
  controllers: [],
  providers: [],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration]
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      logging: false,
      models: [
        User,
        ContactBan,
        ContactAttemp
      ],
      autoLoadModels: true
    }),
    MulterModule.register({ dest: './uploads' }),
    UsersModule,
    ContactBanModule,
    RolesModule,
    AuthModule,
    ContactAttempModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
  }
}
