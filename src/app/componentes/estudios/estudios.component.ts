import { Component, OnInit } from '@angular/core';
import { ProyectoFinalService } from 'src/app/servicios/proyecto-final.service'
import { Estudios } from 'src/app/model/estudios.model';
declare var window:any;

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})

export class EstudiosComponent implements OnInit {
  
  estudios:any;
  e = new Estudios();
  e1 = new Estudios();
  e2 = new Estudios();
  modalAlta: any;
  modalModificacion: any;
  validacion = true;

  constructor(private datosProyecto_final:ProyectoFinalService) { }

  ngOnInit(): void {
    this.datosProyecto_final.obtenerEstudios().subscribe(data => {
      this.estudios=data;
    })
    this.modalAlta = new window.bootstrap.Modal(
      document.getElementById('newEdu')
    );
    this.modalModificacion = new window.bootstrap.Modal(
      document.getElementById('editEstudios')
    );
  }

  crearEstudios(){
    if(this.e.nivel == "" || this.e.establecimiento == "" || this.e.fechaInicio.getTime === new Date(0).getTime)
    {
      this.validacion = false;
    }
    else
    {
      this.validacion = true;
      this.datosProyecto_final.crearEstudios(this.e).subscribe(data => {
        this.ngOnInit();
      })
      this.e = new Estudios();
      this.modalAlta.hide();
    }
  }

  obtenerEstudiosModificacion(id_estudios:any){
    this.datosProyecto_final.obtenerEstudios().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_estudios)
        {
           this.e1 = data[i];
        }
      }
    })
  }

  modificarEstudios(id_estudios:any){
    if(this.e1.nivel == "" || this.e1.establecimiento == "" || this.e1.fechaInicio.getTime == null)
    {
      this.validacion = false;
    }
    else
    {
      this.validacion = true;

    this.datosProyecto_final.modificarEstudios(this.e1, id_estudios).subscribe(data => {
      this.ngOnInit();
      //window.location.reload();
    })
      this.e1 = new Estudios();
      this.modalModificacion.hide();

  }
}
  
  obtenerEstudiosEliminar(id_estudios:any){
    this.datosProyecto_final.obtenerEstudios().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_estudios)
        {
           this.e2 = data[i];
        }
      }
    })
  }

  eliminarEstudios(id_estudios:any){
    this.datosProyecto_final.eliminarEstudios(id_estudios).subscribe((data) => {
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










