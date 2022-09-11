import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Route, Router} from 'simple-boot-core/decorators/route/Router';
import {GET, OPTIONS, POST, UrlMappingSituationType} from 'simple-boot-http-server/decorators/MethodMapping';
import {Mimes} from 'simple-boot-http-server/codes/Mimes';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';
import {ReqHeader} from 'simple-boot-http-server/models/datas/ReqHeader';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {NotFoundError} from 'simple-boot-http-server/errors/NotFoundError';
import {products} from '../data/products'
import {Inject} from 'simple-boot-core/decorators/inject/Inject';
import {CrossRequestEndPoint} from '../endpoints/CrossRequestEndPoint';
import {RandomUtils} from 'simple-boot-core/utils/random/RandomUtils';
import {RequestTransasction, Price, Wallet, NFT} from '../../../domains/Types';
@Sim @Router({path: ''})
export class AppRouter {
    @Route({path: '/infos/{uuid}'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    index(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        const data = products[Math.floor(Math.random() * products.length)];
        return data;
    }

    @Route({path: '/prices/today'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    priceToday(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        const price: Price = {price: Math.floor(RandomUtils.random(4, 10))};
        return price;
    }

    @Route({path: '/prices/today/{num}'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    price(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        const price: Price = {price: Math.floor(RandomUtils.random(4, 10))};
        return price;
    }

    @Route({path: '/auths/wallet'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    authWallet(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${RandomUtils.getRandomString(10)}`
        const uuid = RandomUtils.uuid();
        const data: RequestTransasction = {url, transctionUUID: uuid};
        return data;
    }

    @Route({path: '/auths/wallet/{uuid}'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    async authWalletCheck(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return new Promise((resolve, rejet) => {
            setTimeout(() => {
                const data: Wallet = {
                    address: RandomUtils.uuid(),
                    balance: Math.floor(RandomUtils.random(10, 400))
                }
                resolve(data);
            }, 4000)
        })
    }

    @Route({path: '/auths/{address}/points'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    authWalletPoint(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return products;
    }





    @Route({path: '/auths/{address}/point'}) @OPTIONS()
    authPointOption() {
    }
    @Route({path: '/auths/{address}/point'}) @POST({res: {contentType: Mimes.ApplicationJson}})
    authPoint(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule, @Inject({situationType: UrlMappingSituationType.REQ_JSON_BODY}) body: string[]) {
        return {a:'1'}
    }

    @Route({path: '/auths/{address}/nfts'}) @OPTIONS()
    authNftMakeOption() {
    }
    @Route({path: '/auths/{address}/nfts'}) @POST({res: {contentType: Mimes.ApplicationJson}})
    authNftMake(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule, @Inject({situationType: UrlMappingSituationType.REQ_JSON_BODY}) body: string[]) {
        // rr.reqBodyJsonData()
        console.log('body--->', body)
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${RandomUtils.getRandomString(10)}`
        const uuid = RandomUtils.uuid();
        const data: RequestTransasction = {url, transctionUUID: uuid};
        return data;
    }

    @Route({path: '/auths/{address}/nfts/{uuid}'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    async authNftMakeCheck(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return new Promise((resolve, rejet) => {
            setTimeout(() => {
                const data: Wallet = {
                    address: RandomUtils.uuid(),
                    balance: Math.floor(RandomUtils.random(10, 400))
                }
                resolve(data);
            }, 4000)
        })
    }

    @Route({path: '/auths/{address}/nfts'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    async authWalletNfts(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        const products = () => Array.from({length: 5}, () => RandomUtils.getRandomString(4));
        const datas: NFT[] =  Array.from({length: 5}, () => ({uuid: RandomUtils.getRandomString(14), point: Math.floor(RandomUtils.random(1,40)), products: products()}));
        return datas;
    }




    ///////nft send
    @Route({path: '/auths/{address}/send'}) @OPTIONS()
    authNftSendOption() {
        console.log('-------send Option')
    }
    @Route({path: '/auths/{address}/send'}) @POST({res: {contentType: Mimes.ApplicationJson}})
    authNftSend(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule, @Inject({situationType: UrlMappingSituationType.REQ_JSON_BODY}) body: string[]) {
        // rr.reqBodyJsonData()
        console.log('nft send body--->', body)
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${RandomUtils.getRandomString(10)}`
        const uuid = RandomUtils.uuid();
        const data: RequestTransasction = {url, transctionUUID: uuid};
        return data;
    }

    @Route({path: '/auths/{address}/send/{uuid}'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    async authNftSendCheck(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return new Promise((resolve, rejet) => {
            setTimeout(() => {
                const data: Wallet = {
                    address: RandomUtils.uuid(),
                    balance: Math.floor(RandomUtils.random(10, 400))
                }
                resolve(data);
            }, 4000)
        })
    }




}

const httpServerOption = new HttpServerOption({
    noSuchRouteEndPointMappingThrow: rr => new NotFoundError(),
    requestEndPoints: [CrossRequestEndPoint],
    // errorEndPoints: [CrossRequestEndPoint],
    listen: {
        listeningListener: (server, httpServer) => {
            console.log('server on', httpServer.address());
        }
    }
});
const app = new SimpleBootHttpServer(AppRouter, httpServerOption);
app.run();

// 💥 GET /
// {"name": "visualkhh"}
