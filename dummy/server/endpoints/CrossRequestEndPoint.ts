import {EndPoint} from 'simple-boot-http-server/endpoints/EndPoint';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';

@Sim
export class CrossRequestEndPoint implements EndPoint {
    endPoint(rr: RequestResponse, app: SimpleBootHttpServer): Promise<any> {
        // rr.resSetHeader('Access-Control-Allow-Origin', '*');
        // rr.resSetHeader('Access-Control-Allow-Methods', 'GET POST');
        // rr.resSetHeader('Access-Control-Allow-Headers', 'Content-Type');

        rr.resSetHeader("Access-Control-Allow-Origin", "*")
        rr.resSetHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
        rr.resSetHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        console.log('--22--->', rr.reqUrl, rr.reqMethod());
        return Promise.resolve(undefined);
    }

    onInit(app: SimpleBootHttpServer): Promise<void> {
        return Promise.resolve(undefined);
    }

}
