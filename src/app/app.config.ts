import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpLoaderFactory } from './shared/utlis/translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      tapToDismiss: true,
      newestOnTop: true,
      extendedTimeOut: 1000,
      easing: 'ease-in',
      easeTime: 300,
      maxOpened: 1,
      autoDismiss: true,
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: 'DEFAULT_LANGUAGE',
      useValue: 'en',
    },
  ],
};
