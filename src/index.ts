import {SimFrontOption, UrlType} from 'simple-boot-front/option/SimFrontOption';
import {SimpleBootFront} from 'simple-boot-front/SimpleBootFront';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Router} from 'simple-boot-core/decorators/route/Router';
import {Component} from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import {RouterAction} from 'simple-boot-core/route/RouterAction';
import {Home} from './pages/home/home';
import {Trade} from './pages/trade/trade';
import {Sign} from './pages/sign/sign';

@Sim
@Router({
    path: '',
    route: {
        '/': Home,
        '/trade': Trade,
        '/sign': Sign
    }
})
@Component({
    template,
    styles: [style],
})
export class Index implements RouterAction {
    child?: any;
    async canActivate(url: any, module: any) {
        this.child = module;
        console.log(url, this.child)
    }
}
new SimpleBootFront(Index,  new SimFrontOption(window).setUrlType(UrlType.hash)).run();

