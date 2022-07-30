import { Component, OnInit } from '@angular/core';
import { ProyectoFinalService } from 'src/app/servicios/proyecto-final.service'
import { Proyectos } from 'src/app/model/proyectos.model';
import { windowTime } from 'rxjs';
declare var window:any;


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos:any; 
  p = new Proyectos(); 
  p1 = new Proyectos();
  p2 = new Proyectos(); 
  modalAlta: any;
  modalModificacion: any;
  validacion = true;


  constructor(private datosProyecto_final:ProyectoFinalService) { }

  ngOnInit(): void {
    this.datosProyecto_final.obtenerProyectos().subscribe(data => {
      this.proyectos=data;
    })
    this.modalAlta = new window.bootstrap.Modal(
      document.getElementById('newProyecto')
    );
    this.modalModificacion = new window.bootstrap.Modal(
      document.getElementById('editProyecto')
    );
  }

  crearProyecto(): void{
    if(this.p.tipo == "" || this.p.link_proyecto == "" || this.p.descripcion== "")
    {
      this.validacion = false;
    }
    else

    {this.datosProyecto_final.crearProyecto(this.p).subscribe(data => {
      this.ngOnInit();
    })
    this.p = new Proyectos();
    this.modalAlta.hide();
  }
}


  obtenerProyectoModificacion(id_proyecto:any){
    this.datosProyecto_final.obtenerProyectos().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_proyecto)
        {
           this.p1 = data[i];
        }
      }
    })
  }

  modificarProyecto(id_proyecto:any){
    if(this.p1.tipo == "" || this.p1.link_proyecto == "" || this.p1.descripcion== "")
    {
      this.validacion = false;
    }
    else
    {
      this.validacion = true;

    this.datosProyecto_final.modificarProyecto(this.p1, id_proyecto).subscribe(data => {
      this.ngOnInit();
    })
    this.modalModificacion.hide();
  }
}


  obtenerProyectoEliminar(id_proyecto:any){
    this.datosProyecto_final.obtenerProyectos().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_proyecto)
        {
           this.p2 = data[i];
        }
      }
    })
  }

  eliminarProyecto(id_proyecto:any){
    this.datosProyecto_final.eliminarProyecto(id_proyecto).subscribe((data) => {
      this.ngOnInit();
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
