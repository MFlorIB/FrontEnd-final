import { Component, OnInit } from '@angular/core';
import { ProyectoFinalService } from 'src/app/servicios/proyecto-final.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import {Persona} from 'src/app/model/persona.model'
declare var window:any;



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  mipersona:any;
  miempleoactual:any;
  p = new Persona();
  modalModificacion: any;
  modalModificacion1: any;
  validacion = true;
  acerca_de = "Aprendiz en Programación. Interesada en el desarrollo profesional de aplicaciones en entornos Web y Mobile.";
  acerca:any;
  
  constructor(private datosProyecto_final:ProyectoFinalService, private autenticacionService:AutenticacionService, private ruta:Router) { }

  ngOnInit(): void {
    this.datosProyecto_final.obtenerPersona().subscribe(data =>{
      this.mipersona=data;
    });
    this.modalModificacion = new window.bootstrap.Modal(
      document.getElementById('editProfile')
    );
    this.modalModificacion1 = new window.bootstrap.Modal(
      document.getElementById('editAbout')
    );

    this.datosProyecto_final.obtenerEmpleos().subscribe(data => {
      
      for (let i = 0; i < data.length; i++) {
        if(data[i].es_trabajo_actual == true && data[i].fecha_fin == null)
        {
          this.miempleoactual = data[i];
        }
      }
    })

  }

  obtenerPersonaModificar(){
    this.datosProyecto_final.obtenerPersona().subscribe(data => {
      this.p = data;
    })
  }

  modificarPersona(id_persona:any){
    if(this.p.nombres == "" || this.p.apellidos == ""  || this.p.correo_electronico == ""  || this.p.domicilio == ""  || this.p.telefono == "")
    {
      this.validacion = false;
    }
    else
    {
    this.datosProyecto_final.modificarPersona(this.p, id_persona).subscribe(data =>{
      this.ngOnInit();
    })
    this.modalModificacion.hide();
    }
  }

  cerrarModalModificacion(){
    this.validacion = true;
    this.modalModificacion.hide();
  }

  cargarAcercaDe(){
    this.acerca = this.acerca_de;
  }

  modificarAcercaDe(acerca:any)
  {
    if(acerca == "")
    {
      this.validacion = false;
    }
    else
    {
      this.acerca_de = acerca;
      this.modalModificacion1.hide();
    }
}
cerrarModalModificacion1(){
  this.validacion = true;
  this.modalModificacion1.hide();
}


  CerrarSesion() {
    this.autenticacionService.CerrarSesion();
    this.ruta.navigate(['/iniciar-sesion']);
  }

  
}










