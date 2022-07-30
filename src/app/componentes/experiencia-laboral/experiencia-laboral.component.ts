import { Component, OnInit } from '@angular/core';
import { ProyectoFinalService } from 'src/app/servicios/proyecto-final.service'
import {ExperienciaLaboral} from 'src/app/model/experiencia-laboral.model'
declare var window:any;

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  trabajos:any;
  tipo_trabajos:any;
  t = new ExperienciaLaboral();
  t1 = new ExperienciaLaboral();
  t2 = new ExperienciaLaboral();
  modalAlta: any;
  modalModificacion: any;
  validacion = true;


  constructor(private datosProyecto_final:ProyectoFinalService) { }

  ngOnInit(): void {
    this.datosProyecto_final.obtenerEmpleos().subscribe(data =>{
      this.trabajos = data;
    })
    this.modalAlta = new window.bootstrap.Modal(
      document.getElementById('newExp')
    );
    this.modalModificacion = new window.bootstrap.Modal(
      document.getElementById('editExp')
    )
  }

  
  cargarTipoEmpleo(){
    this.datosProyecto_final.obtenerTipoEmpleos().subscribe(data => {
      this.tipo_trabajos = data;
    })
    
  }

  crearEmpleo(){
    if(this.t.nombre_empresa == "" || this.t.tipo_empleo.id == 0  || this.t.fechaInicio.getTime === new Date(0).getTime || this.t.fecha_fin.getTime === new Date(0).getTime ||this.t1.fechaInicio.getTime == null || this.t1.fecha_fin.getTime == null)
    {
      this.validacion = false;
    }
    else
    {
      this.validacion = true;
    this.datosProyecto_final.crearEmpleo(this.t, this.t.tipo_empleo).subscribe(data => {
      this.ngOnInit();
    })
    this.t = new ExperienciaLaboral();
    this.modalAlta.hide();
  }
}

  obtenerEmpleoModificar(id_empleo:any){
    this.cargarTipoEmpleo();
    this.datosProyecto_final.obtenerEmpleos().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_empleo)
        {
           this.t1 = data[i];
        }
      }
    })
  }

  modificarEmpleo(id_empleo:any){
    if(this.t1.nombre_empresa == "" || this.t1.tipo_empleo == null  || this.t1.fechaInicio.getTime == null || this.t1.fecha_fin.getTime == null)
    {
      this.validacion = false;
    }
    else
    {
      this.validacion = true;

    this.datosProyecto_final.modificarEmpleo(this.t1, id_empleo).subscribe(data =>{
      this.ngOnInit();
    })
    this.t1 = new ExperienciaLaboral();
    this.modalModificacion.hide();
  }
}


  obtenerEmpleoEliminar(id_empleo:any){
    this.datosProyecto_final.obtenerEmpleos().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_empleo)
        {
           this.t2 = data[i];
        }
      }
    })
  }

  eliminarEmpleo(id_empleo:any){
    this.datosProyecto_final.eliminarEmpleo(id_empleo).subscribe((data) => {
      this.ngOnInit();
      //window.location.reload();
    })
  }
  
  cerrarModalAlta(){
    this.validacion = true;
    this.modalAlta.hide();

  }
  cerrarModalModificacion(){
    this.validacion = true;
    this.modalModificacion.hide();
  }

}
