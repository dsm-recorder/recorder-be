import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserTypeormEntity} from "../../user/persistence/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeormEntity])]
})
export class UserModule {}