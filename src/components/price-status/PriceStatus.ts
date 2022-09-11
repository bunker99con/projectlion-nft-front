import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './pricestatus.html';
import style from './pricestatus.css';
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
import {Price} from '../../../domains/Types';
@Sim
@Component({
    selector: 'price-status',
    template,
    styles: [style],
})
export class PriceStatus implements OnCreateRender {
    private todayPrice: Price | undefined;
    private yesterdayPrice: Price | undefined;
    private diff = 0;
    private diffIcon = '📊';

    constructor(private routeManager: RouterManager, private navigation: Navigation, private apiService: ApiService, private userService: UserService) {
    }

    async onCreateRender() {
        this.todayPrice = await this.apiService.get<Price>({url: '/prices/today', disabledSuccessAlert: true, disabledProgressAlert: true});
        this.yesterdayPrice = await this.apiService.get<Price>({url: '/prices/today/-1', disabledSuccessAlert: true, disabledProgressAlert: true});
        this.diff = ((this.yesterdayPrice?.price??0)-(this.todayPrice?.price??0));
        this.diffIcon = this.diff < 0 ? '📉' : '📈';
    }


}
