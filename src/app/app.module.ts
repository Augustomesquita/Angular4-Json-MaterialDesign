import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { } from 'bootstrap';
import { ComponenteReusavelComponent } from './componente-reusavel/componente-reusavel.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteReusavelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
