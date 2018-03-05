// Módulos do angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Registra local para Brasil
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

// Módulos de terceiros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';

// Elementos criados para o projeto
import { AppRouting } from './app.routing'
import { MouseOverHighlightDirective } from './shared/mouse-over-highlight/mouse-over-highlight.directive';
import { MeuServicoService } from './service/meu-servico/meu-servico.service';
import { SettingsService } from './service/settings/settings.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-layout/login/login.component';
import { ComponenteReusavelComponent } from './main-layout/main/home/componente-reusavel/componente-reusavel.component';
import { HomeComponent } from './main-layout/main/home/home.component';
import { AboutComponent } from './main-layout/main/about/about.component';
import { NavComponent } from './main-layout/main/nav/nav.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CursoComponent } from './main-layout/main/home/curso/curso.component';
import { CursoService } from './service/curso/curso.service';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1604161956329292')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('331487605606-uelg4mi5n56qajtsk10i9hg6nf13cbln.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    MouseOverHighlightDirective,
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    ComponenteReusavelComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    CursoComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularSvgIconModule,
    AppRouting,
  ],
  providers: [
    MeuServicoService,
    SettingsService,
    CursoService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: settingService => settingService.getLocale()
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
