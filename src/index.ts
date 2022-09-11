import {SimFrontOption, UrlType} from 'simple-boot-front/option/SimFrontOption';
import {SimpleBootFront} from 'simple-boot-front/SimpleBootFront';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Router} from 'simple-boot-core/decorators/route/Router';
import {Component, getComponent} from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import {RouterAction} from 'simple-boot-core/route/RouterAction';
import {Home} from './pages/home/home';
import {Trade} from './pages/trade/trade';
import {Sign} from './pages/sign/sign';
import {Infos} from './pages/infos/infos';
import {ComponentSet} from 'dom-render/components/ComponentSet';
import {Product} from './pages/infos/produc/product';
import {AlertService} from './services/alerts/AlertService';
import {ApiService} from './services/api/ApiService';
import {RequestTransasction, Wallet} from '../domains/Types';
import {UserInfo, UserService} from './services/user/UserService';
import {OnInitRender} from 'dom-render/lifecycle/OnInitRender';
import {OnCreateRender} from 'dom-render/lifecycle/OnCreateRender';
import {OnDestroyRender} from 'dom-render/lifecycle/OnDestroyRender';
import {CreatorMetaData} from 'dom-render/rawsets/CreatorMetaData';
import {Subject, Subscriber, Subscription} from 'rxjs';
import {Observable} from 'rxjs';
import {Point} from './pages/points/Point';
import {PriceStatus} from './components/price-status/PriceStatus';
import {Nfts} from './pages/nfts/Nfts';

@Sim
@Router({
    path: '',
    route: {
        '/': Home,
        '/infos': Infos,
        '/infos/{qr}': Product,
        '/points': Point,
        '/nfts': Nfts,
        '/trade': Trade,
        '/sign': Sign
    }
})
@Component({
    template,
    styles: [style],
    using: [PriceStatus]
})
export class Index implements RouterAction, OnCreateRender, OnInitRender, OnDestroyRender {
    child?: any;
    public menuBlindElement?: HTMLDivElement;
    private user?: UserInfo;
    private userSubscription?: Subscription;

    constructor(private userService: UserService) {
    }

    hasActivate?(checkObj: any): boolean {
        throw new Error('Method not implemented.');
    }

    toggleMenu() {
        console.log('-->', this.menuBlindElement);
        this.menuBlindElement?.classList.toggle('hidden');
    }

    async signWallet() {
        if (this.user?.use) {
            this.userService.signOut();
        } else {
            this.userService.sign();
        }
    }

    onCreateRender(...param: any[]): void {
        this.userSubscription = this.userService.user.subscribe(it => {
            this.user = it;
        })
    }

    onInitRender(...param: any[]): void {
    }

    onDestroyRender(metaData?: CreatorMetaData | undefined): void {
        console.log('index-->-onDestroyRender--')
        this.userSubscription?.unsubscribe();
    }

    async canActivate(url: any, module: any) {
        // console.log('url-->', module);
        this.child = module;
        // console.log(url, this.child)
    }

}

const simpleBootFront = new SimpleBootFront(Index, new SimFrontOption(window).setUrlType(UrlType.hash));
simpleBootFront.domRendoerExcludeProxy.push(Subscriber, Subscription, Observable);
simpleBootFront.run();

