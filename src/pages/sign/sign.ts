import { Component } from 'simple-boot-front/decorators/Component';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import template from './sign.html';
import style from './sign.css';
@Sim
@Component({
    template,
    styles: [style],
})
export class Sign {
}
