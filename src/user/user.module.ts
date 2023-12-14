import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { User, UserSchema } from './schema/user.schema';
import { AuthenticationMiddleware } from '../middlewares/authentication/authentication.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule{
}
