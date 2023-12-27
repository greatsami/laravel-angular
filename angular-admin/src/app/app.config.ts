import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CredentialInterceptor} from "./interceptors/credential.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";


/** Provider for the credential Interceptor. */
export const credentialInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: CredentialInterceptor, multi: true };


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    credentialInterceptorProvider,
    provideAnimations()
  ]
};

