import {Sim } from 'simple-boot-core/decorators/SimDecorator';
import {BehaviorSubject, defer} from 'rxjs';
import {AlertService} from '../alerts/AlertService';
import {RequestTransasction, Wallet} from '../../../domains/Types';
import {ApiService} from '../api/ApiService';
import {DomRender} from 'dom-render';
import {DomRenderFinalProxy} from 'dom-render/types/Types';
import {StorageUtils} from 'dom-render/utils/storage/StorageUtils';
import {SimFrontOption} from 'simple-boot-front/option/SimFrontOption';
export type UserInfo = {
    use: boolean;
    avataImg: string;
    wallet?: Wallet;
}
export const DefaultUser: UserInfo = {
    use: false,
    avataImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUGzSUbfQVEgY4TH7CZEl14ED8WXrixgU9A&usqp=CAU'
};
const StorageKey = 'nft-user';

@Sim
export class UserService {
    private $user: BehaviorSubject<UserInfo>;


    constructor(private apiService: ApiService, private alertService: AlertService, private option: SimFrontOption) {
        let localUser = StorageUtils.getLocalStorageJsonItem<UserInfo>(StorageKey, option.window);
        this.$user = new BehaviorSubject<UserInfo>(localUser ?? DefaultUser);
    }

    async sign() {
        const data = await this.apiService.get<RequestTransasction>({url: '/auths/wallet', disabledSuccessAlert: true});
        if (data) {
            const modal = this.alertService.modal('Klip 지갑인증 해주세요.', `<div class="flex justify-center"><img src='${data.url}'></div>`);
            modal.show();
            const t = await this.apiService.get<Wallet>({url: `/auths/wallet/${data.transctionUUID}`, desc: '지갑인증', disabledProgressAlert: true});
            modal.close();
            const avataImg = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
            this.save({use: true, avataImg, wallet: t});
        }
    }

    signOut() {
        this.save(DefaultUser)
    }

    private save(user: UserInfo) {
        StorageUtils.setLocalStorageItem(StorageKey, user, this.option.window);
        this.$user.next(user);

    }

    get user() {
        return this.$user.asObservable();
    }
}
