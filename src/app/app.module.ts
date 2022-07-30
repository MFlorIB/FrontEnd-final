import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule } from '@angular/forms'
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es')
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { PersonaComponent } from './componentes/persona/persona.component';
import { ExperienciaLaboralComponent } from './componentes/experiencia-laboral/experiencia-laboral.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HardAndSoftComponent } from './componentes/hard-and-soft/hard-and-soft.component';
import { EstudiosComponent } from './componentes/estudios/estudios.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './componentes/footer/footer.component';
import { InterceptorService } from './servicios/interceptor.service';
import {ProyectoFinalService} from './servicios/proyecto-final.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ExperienciaLaboralComponent,
    ProyectosComponent,
    HardAndSoftComponent,
    EstudiosComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ProyectoFinalService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: LOCALE_ID, useValue:'es'}
 
  ],



  bootstrap: [AppComponent]
})
export class AppModule { }
