import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model'
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration'

@Module({
  controllers: [],
  providers: [],
  imports: [
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
      logging: true,
      models: [
        User
      ],
      autoLoadModels: true
    }),
    MulterModule.register({ dest: './uploads' }),
    UsersModule,
    RolesModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY
    }),
    AuthModule
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
  }
}
