import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './trade.html';
import style from './trade.css';
@Sim
@Component({
    template,
    styles: [style],
})
export class Trade {
}
