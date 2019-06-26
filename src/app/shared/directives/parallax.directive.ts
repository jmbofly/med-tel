import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appParallax]',
  exportAs: 'mouseParallax',
})
export class ParallaxDirective {
  constructor() {}

  mouseMoved(e: MouseEvent, el: HTMLElement) {
    const w = window.innerWidth / 2;
    const h = window.innerHeight / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (window.innerWidth < 600) {
      el.style.backgroundPosition = 'center 0';
      return;
    }
    const depth1 = `${50 - (mouseX - w) * 0.01}% ${50 - (mouseY - h) * 0.01}%`;
    const depth2 = `${50 - (mouseX - w) * 0.02}% ${50 - (mouseY - h) * 0.02}%`;
    const depth3 = `${50 - (mouseX - w) * 0.06}% ${50 - (mouseY - h) * 0.06}%`;
    const x = `${depth3}, ${depth2}, ${depth1}`;
    // console.log(x);
    el.style.backgroundPosition = x;
  }
}
