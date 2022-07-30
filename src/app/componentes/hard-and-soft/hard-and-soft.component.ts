import { Component, OnInit } from '@angular/core';
import { ProyectoFinalService } from 'src/app/servicios/proyecto-final.service'
import { HardAndSoft } from 'src/app/model/hard-and-soft.model';
declare var window:any;


@Component({
  selector: 'app-hard-and-soft',
  templateUrl: './hard-and-soft.component.html',
  styleUrls: ['./hard-and-soft.component.css']
})
export class HardAndSoftComponent implements OnInit {

  hard_and_soft:any; 
  h = new HardAndSoft(); 
  h1 = new HardAndSoft(); 
  h2 = new HardAndSoft(); 
  modalAlta: any;
  modalModificacion: any;
  validacion = true;


  constructor(private datosProyecto_final:ProyectoFinalService) { }

  ngOnInit(): void {
    this.datosProyecto_final.obtenerHys().subscribe(data => {
      this.hard_and_soft=data;
    })
    this.modalAlta = new window.bootstrap.Modal(
      document.getElementById('newApt')
    );
    this.modalModificacion = new window.bootstrap.Modal(
      document.getElementById('modificarApt')
    );
  }

  crearHys(){
    if(this.h.tipo == "" || this.h.porcentaje <= 0)
    {
      this.validacion = false;
    }
    else

    {this.datosProyecto_final.crearHys(this.h).subscribe(data => {
      this.ngOnInit();
    })
    this.h = new HardAndSoft();
    this.modalAlta.hide();
  }
}

  obtenerHysModificacion(id_hard_and_soft:any){
    this.datosProyecto_final.obtenerHys().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_hard_and_soft)
        {
           this.h1 = data[i];
        }
      }
    })
  }

  modificarHys(id_hard_and_soft:any){
    if(this.h1.tipo == "" || this.h1.porcentaje <= 0)
    {
      this.validacion = false;
    }
    else
{
      this.validacion = true;

    this.datosProyecto_final.modificarHys(this.h1, id_hard_and_soft).subscribe(data => {
      this.ngOnInit();
    })
    this.modalModificacion.hide();
  }
}

  obtenerHysEliminar(id_hard_and_soft:any){
    this.datosProyecto_final.obtenerHys().subscribe(data => {
      for(let i = 0; i< data.length; i++){
        if(data[i].id == id_hard_and_soft)
        {
           this.h2 = data[i];
        }
      }
    })
  }

  eliminarHys(id_hard_and_soft:any){
    this.datosProyecto_final.eliminarHys(id_hard_and_soft).subscribe((data) => {
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
