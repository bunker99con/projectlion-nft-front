import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './infos.html';
import style from './infos.css';
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
@Sim
@Component({
    template,
    styles: [style],
})
export class Infos implements OnInitRender, OnCreateRender {
    form = new class extends FormValidator {
      uuid = new NotEmptyValidator()
    };
    name = "infos";

    constructor(private routeManager: RouterManager, private navigation: Navigation, private apiService: ApiService) {
    }

    onCreateRender(...param: any[]): void {
        console.log('----?')
        // this.apiService.get({url: 'https://random-data-api.com/api/v2/users'}).then(it => {
        //     console.log('data->', it)
        // })
        // this.alertService.danger('danger').show();
        // this.alertService.warning('warning').show();
        // this.alertService.success('success').show();
        // this.alertService.primary('primary').show();
        // this.alertService.progress('progress').show();
        console.log('Infos Method not implemented.', param, this.navigation.pathInfo.path, this.routeManager.activeRouterModule?.pathData);
    }

    onInitRender(...param: any[]): void {
        console.log('Infos Method not implemented.');
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
    @OnRoute
    onRoute(routeModule: RouterModule) {
        console.log('onRoute,', routeModule, routeModule.intent?.queryParams);

    }
}
