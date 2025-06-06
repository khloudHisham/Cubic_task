import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [TranslateModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customer-registration';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

}
