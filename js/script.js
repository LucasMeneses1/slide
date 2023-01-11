import {SlideNav} from './slide.js';

const slide = new SlideNav('.slide-wrapper', '.slide', 'ativo');
slide.Init();
slide.addArrow('.prev', '.next');
