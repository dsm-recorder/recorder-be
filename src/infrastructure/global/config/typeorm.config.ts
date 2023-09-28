import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {UserModule} from "../module/user.module";
import {UserTypeormEntity} from "../../user/persistence/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11111111',
      database: 'recorder',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
  ],
})
export class TypeormConfigModule {}