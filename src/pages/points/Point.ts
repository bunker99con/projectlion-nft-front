import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './point.html';
import style from './point.css';
import {Navigation} from 'simple-boot-front/service/Navigation';
import {OnInitRender} from 'dom-render/lifecycle/OnInitRender';
import {OnCreateRender} from 'dom-render/lifecycle/OnCreateRender';
import {OnRoute} from 'simple-boot-core/decorators/route/OnRoute';
import {RouterManager} from 'simple-boot-core/route/RouterManager';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {FormValidator} from 'dom-render/validators/FormValidator';
import {NotEmptyValidator} from 'dom-render/validators/NotEmptyValidator';
import {AlertService} from '../../services/alerts/AlertService';
import {ApiService} from '../../services/api/ApiService';
import {RouterAction} from 'simple-boot-core/route/RouterAction';
import {UserInfo, UserService} from '../../services/user/UserService';
import {OnDestroyRender} from 'dom-render/lifecycle/OnDestroyRender';
import {Subscription} from 'rxjs';
import {Product, RequestTransasction, Wallet} from '../../../domains/Types';
@Sim
@Component({
    template,
    styles: [style],
})
export class Point implements OnInitRender, OnDestroyRender, OnCreateRender {
    form = new class extends FormValidator {
      uuid = new NotEmptyValidator()
    };
    name = "infos";
    private user?: UserInfo;
    private userSubscription?: Subscription;
    private points: (Product & {checked?: boolean})[] | undefined;
    private allPoint = 0;
    private checkedPoint = 0;
    constructor(private alertService: AlertService, private routeManager: RouterManager, private navigation: Navigation, private apiService: ApiService, private userService: UserService) {
    }

    onCreateRender(...param: any[]): void {
        this.userSubscription = this.userService.user.subscribe(it => {
            this.user = it;
        })
    }

    async onInitRender(...param: any[]){
        this.points = await this.apiService.get<Product[]>({url: `/auths/${this.user?.wallet?.address}/points`, disabledSuccessAlert: true});
        this.allPoint = this.points?.map(it => it.point).reduce((a, b) => a + b) ?? 0;
        // this.points?.map(it => it.point).reduce((a, b) => a + b);
        // this.points?.reduce((a: Product, b:Product) => {
        //     return a.point + b.point;});
    }

    onInit(...data: any): any {
        console.log('----------', this.navigation)
    }

    submit() {
        console.log('----->', this.form.valid())
        if (this.form.valid()) {
            this.navigation.go(`/infos/${this.form?.uuid?.value}`)
        } else {

        }
        this.form.reset();
    }

    search(uuid: string) {
        this.navigation.go(`/infos/${uuid}`);
    }

    itemChange(uuid: string, checked: boolean) {
        const find = this.points?.find(it => it.uuid === uuid);
        if (find) {
            find.checked = checked;
        }
        this.checkedPoint = this.points?.filter(it => it.checked).map(it => it.point).reduce((a, b) => a + b) ?? 0;
    }

    async makeNft() {
        const data = this.points?.filter(it => it.checked).map(it => it.uuid) ?? [];
        const rdata = await this.apiService.post<RequestTransasction>({url: `/auths/${this.user?.wallet?.address}/nfts`, data, disabledSuccessAlert: true});
        if (rdata) {
            const modal = this.alertService.modal('Klip 지갑인증 해주세요. NFT만들기', `<div class="flex justify-center"><img src='${rdata.url}'></div>`);
            modal.show();

            const t = await this.apiService.get<Wallet>({url: `/auths/${this.user?.wallet?.address}/nfts/${rdata.transctionUUID}`, desc: '지갑인증', disabledProgressAlert: true});
            modal.close();
            this.navigation.go('/nfts');
        }
    }

    @OnRoute
    onRoute(routeModule: RouterModule) {
        console.log('onRoute,', routeModule, routeModule.intent?.queryParams);

    }

    onDestroyRender(): void {
        this.userSubscription?.unsubscribe();
    }

}
