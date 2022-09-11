import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './home.html';
import style from './home.css';
import {OnInitRender} from 'dom-render/lifecycle/OnInitRender';
import {ApiService} from '../../services/api/ApiService';
import {Price} from '../../../domains/Types';
@Sim
@Component({
    template,
    styles: [style],

})
export class Home implements OnInitRender {
    name = 'home';
    toggle = false;

    constructor(private apiService: ApiService) {
    }

    async onInitRender() {
    }
}
