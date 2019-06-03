import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MedTelPlus';

  ngOnInit() {
    Aos.init({
      useClassNames: true,
      animatedClassName: 'animated',
      duration: 800,
      easing: 'ease',
    });
  }
}
