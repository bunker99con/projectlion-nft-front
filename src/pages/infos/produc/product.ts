import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './product.html';
import style from './product.css';
import {Navigation} from 'simple-boot-front/service/Navigation';
import {OnInitRender} from 'dom-render/lifecycle/OnInitRender';
import {OnCreateRender} from 'dom-render/lifecycle/OnCreateRender';
import {OnRoute} from 'simple-boot-core/decorators/route/OnRoute';
import {RouterManager} from 'simple-boot-core/route/RouterManager';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {FormValidator} from 'dom-render/validators/FormValidator';
import {NotEmptyValidator} from 'dom-render/validators/NotEmptyValidator';
import {ApiService} from '../../../services/api/ApiService';
import {OnProxyDomRender} from 'dom-render/lifecycle/OnProxyDomRender';
import {Config} from 'dom-render/configs/Config';
import {OnDestroyRender} from 'dom-render/lifecycle/OnDestroyRender';
import {UserInfo, UserService} from '../../../services/user/UserService';
import {Subscription} from 'rxjs';
import {DomRender} from 'dom-render';
import {DomRenderFinalProxy} from 'dom-render/types/Types';
import {AlertService} from '../../../services/alerts/AlertService';
import {Product as ProductType} from '../../../../domains/Types';
@Sim
@Component({
    template,
    styles: [style],
})
export class Product implements OnInitRender, OnCreateRender, OnProxyDomRender, OnDestroyRender {
    form = new class extends FormValidator {
      point = new NotEmptyValidator()
    };
    name = "infos";
    private data: ProductType | undefined;
    private userSubscription?: Subscription;
    private user?: UserInfo;

    constructor(private userService: UserService, private routeManager: RouterManager, private alertService: AlertService, private navigation: Navigation, private apiService: ApiService) {
    }

    async onCreateRender(...param: any[]) {
        console.log('Infos onCreateRender', param);
        this.data = await this.apiService.get<ProductType>({url: `/infos/${this.routeManager.activeRouterModule?.pathData?.qr}`, disabledSuccessAlert: true});
    }

    onInitRender(...param: any[]): void {
        this.userSubscription = this.userService.user.subscribe(it => {
            this.user = it;
        });
    }

    async submit() {
        this.form.allSyncValue();
        // console.log('-------', this.form.valid(), this.user?.use)
        if (this.form.valid()) {
            if (this.user?.use) {
               await this.apiService.post<void>({url:`/auths/${this.user.wallet?.address}/point`, data: this.data?.uuid, desc: '포인트 적립'});
                this.navigation.go('/points');
            } else {
                this.alertService.danger('로그인이 필요합니다.(지갑인증)').show();
            }
        } else {
            this.alertService.danger('적립 포인트를 확인해주세요.').show();
        }
    }

    @OnRoute
    onRoute(routeModule: RouterModule) {
        console.log('onRoute,', routeModule, routeModule.intent?.queryParams);

    }

    onProxyDomRender(config: Config): void {
    }

    onDestroyRender(): void {
        this.userSubscription?.unsubscribe();
    }
}
