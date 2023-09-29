import {Injectable} from "@nestjs/common";
import {UserPort} from "../../../application/user/spi/user.spi";

@Injectable()
export class UserPersistenceAdapter implements UserPort{

}