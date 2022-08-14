import {Sim } from 'simple-boot-core/decorators/SimDecorator';
import {BehaviorSubject} from 'rxjs';
export const DefaultUser = {
    use: false,
};
@Sim
export class UserService {
    public $user = new BehaviorSubject<any>(DefaultUser);
}
