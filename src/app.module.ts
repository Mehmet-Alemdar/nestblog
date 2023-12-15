import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestblog'), UserModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        path: 'user/findAll',
        method: RequestMethod.GET
      },
      {
        path: 'blog',
        method: RequestMethod.ALL
      }
    );
  }
}
