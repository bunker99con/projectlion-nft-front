import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {AlertService} from '../alerts/AlertService';
import {environment} from '../../../environments/environment';

export type Request = {
    url: string;
    data?: any;
    desc?: string;
    disabledProgressAlert?: boolean;
    disabledSuccessAlert?: boolean;
    disabledErrorAlert?: boolean;
}

@Sim
export class ApiService {

    constructor(private alertService: AlertService) {
    }

    async get<T>(request: Request): Promise<T | undefined> {
        let alert = this.alertService.progress(request.desc ?? 'loading..');
        if (!request.disabledProgressAlert) {
            alert.show();
        }
        try {
            const rdata = await fetch(environment.apiHost + request.url + (request.data ? '?' + new URLSearchParams(request.data).toString() : ''));
            if (!request.disabledProgressAlert) {
                alert.close();
            }
            if (rdata.ok) {
                const data = await rdata.json();
                if (!request.disabledSuccessAlert) {
                    this.alertService.success(`${request.desc ?? ''} 성공하였습니다.`).show();
                }
                return data;
            } else {
                throw Error('error')
            }
        }catch (e) {
            alert.close();
            if (!request.disabledErrorAlert) {
                this.alertService.danger(`${request.desc ?? ''} 실패하였습니다.`).show();
            }
        }

    }

   async post<T>(request: Request): Promise<T | undefined> {
        let alert = this.alertService.progress(request.desc ?? 'loading..');
        if (!request.disabledProgressAlert) {
            alert.show();
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        try {
            const body =  (request.data instanceof FormData) ? request.data : JSON.stringify(request.data);
            const rdata = await fetch(environment.apiHost + request.url, {method: 'POST', headers: headers, body: body});
            if (!request.disabledProgressAlert) {
                alert.close();
            }
            if (rdata.ok) {
                const data = await rdata.json();
                if (!request.disabledSuccessAlert) {
                    this.alertService.success(`${request.desc ?? ''} 성공하였습니다.`).show();
                }
                return data;
            } else {
                throw Error('error')
            }
        }catch (e) {
            alert.close();
            if (!request.disabledErrorAlert) {
                this.alertService.danger(`${request.desc ?? ''} 실패하였습니다.`).show();
            }
        }
    }
}
