import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  {Observable} from "rxjs";
import { Proyectos } from '../model/proyectos.model';
import {Estudios} from '../model/estudios.model';
import { HardAndSoft } from '../model/hard-and-soft.model';
import { ExperienciaLaboral } from '../model/experiencia-laboral.model';
import { TipoEmpleo } from '../model/tipo-empleo.model';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoFinalService {

  baseURL:string = "https://portfolioflorinchauspe.herokuapp.com/"
  //baseURL:string = "http://localhost:8080/"

  constructor(private http:HttpClient) { }

 
  obtenerPersona():Observable<any>{
    return this.http.get(this.baseURL+"ver/persona/1");
  }

  modificarPersona(persona: Persona, id:any ):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const perso = {
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      domicilio: persona.domicilio,
      correo_electronico: persona.correo_electronico,
      telefono: persona.telefono
    };
    const json = JSON.stringify(perso);
    return this.http.put(this.baseURL+"editar/persona/"+id,json,{'headers':headers});

  }

  
  obtenerEmpleos():Observable<any>{
    return this.http.get(this.baseURL+"ver/experienciasXpersona/1");
  }

  obtenerTipoEmpleos():Observable<any>{
    return this.http.get(this.baseURL+"ver/tipo_empleo");
  }

  crearEmpleo(empleo: ExperienciaLaboral, tipo: TipoEmpleo):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const trab = {
      nombre_empresa: empleo.nombre_empresa,
      es_trabajo_actual: empleo.es_trabajo_actual,
      fechaInicio: empleo.fechaInicio,
      fecha_fin: empleo.fecha_fin,
      descripcion: empleo.descripcion,
      persona: {
        id: "1"
      },
      tipo_empleo:{
        id: tipo.id
      }
    };
    var json = JSON.stringify(trab);

    if(trab.es_trabajo_actual == true){
      var json2 = JSON.parse(json);
      json2["fecha_fin"] = null;
      json = JSON.stringify(json2);
    }
    return this.http.post(this.baseURL+"new/experiencia_laboral",json,{'headers':headers});
  }

  modificarEmpleo(empleo: ExperienciaLaboral, id:any):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const trab = {
      nombre_empresa: empleo.nombre_empresa,
      es_trabajo_actual: empleo.es_trabajo_actual,
      fechaInicio: empleo.fechaInicio,
      fecha_fin: empleo.fecha_fin,
      descripcion: empleo.descripcion,
      tipo_empleo:{
        id: empleo.tipo_empleo.id
      }
    };
    const json = JSON.stringify(trab);
    return this.http.put(this.baseURL+"editar/experiencia_laboral/"+id,json,{'headers':headers});
  }


eliminarEmpleo(id:any):Observable<any>{
    return this.http.delete(this.baseURL+"borrar/experiencia_laboral/"+id);
  }

 
  obtenerEstudios():Observable<any>{
    return this.http.get(this.baseURL+"ver/estudiosXpersona/1")
  }

  crearEstudios(estudios: Estudios):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const estu = {
      nivel: estudios.nivel,
      descripcion: estudios.descripcion,
      establecimiento: estudios.establecimiento,
      fecha_fin: estudios.fecha_fin,
      fechaInicio: estudios.fechaInicio,
      persona: {
        id: "1"
      }
      
    };
    const json = JSON.stringify(estu);
    return this.http.post(this.baseURL+"new/estudios",json,{'headers':headers});
  } 

  modificarEstudios(estudios: Estudios, id:any):Observable<any>{
    const headers = {'content-type': 'application/json'};
    const estu ={
      nivel: estudios.nivel,
      descripcion: estudios.descripcion,
      establecimiento: estudios.establecimiento,
      fecha_fin: estudios.fecha_fin,
      fechaInicio: estudios.fechaInicio,
    };
    const json = JSON.stringify(estu);
    return this.http.put(this.baseURL+"editar/estudios/"+id,json,{'headers':headers});
  }

  eliminarEstudios(id:any):Observable<any>{
    return this.http.delete(this.baseURL+"borrar/estudios/"+id);
  }

  
  obtenerHys():Observable<any>{
    return this.http.get(this.baseURL+"ver/hard_and_soft_persona/1")
  }

  crearHys(hard_and_soft: HardAndSoft):Observable<any>{
    const headers = {'content-type': 'application/json'};
    const hard = {
      tipo: hard_and_soft.tipo,
      porcentaje: hard_and_soft.porcentaje,
      persona: {
        id:"1"
      }
    };
    const json = JSON.stringify(hard);
    return this.http.post(this.baseURL+"new/hard_and_soft",json,{'headers':headers});

  }

  modificarHys(hard_and_soft: HardAndSoft, id:any):Observable<any>{
    const headers = {'content-type': 'application/json'};
    const hard = {
      tipo: hard_and_soft.tipo,
      porcentaje: hard_and_soft.porcentaje,
    };
    const json =JSON.stringify(hard);
    return this.http.put(this.baseURL+"editar/hard_and_soft/"+id,json,{'headers':headers});
  }
  
  eliminarHys(id:any):Observable<any>{
    return this.http.delete(this.baseURL+"borrar/hard_and_soft/"+id);
  }

 
  obtenerProyectos():Observable<any>{
    return this.http.get(this.baseURL+"ver/proyectosXpersona/1")
  }

  crearProyecto(proyecto: Proyectos):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const proy = {
      tipo: proyecto.tipo,
      link_proyecto: proyecto.link_proyecto,
      descripcion: proyecto.descripcion,
      persona:{
        id: "1"
      }
    };
    const json = JSON.stringify(proy);
    return this.http.post(this.baseURL+"new/proyectos",json,{'headers':headers});
  }


  modificarProyecto(proyecto: Proyectos, id:any):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const proy = {
      tipo: proyecto.tipo,
      link_proyecto: proyecto.link_proyecto,
      descripcion: proyecto.descripcion,
  
    };
    const json = JSON.stringify(proy);
    return this.http.put(this.baseURL+"editar/proyectos/"+id,json,{'headers':headers});
  }


  eliminarProyecto(id:any):Observable<any>{
    return this.http.delete(this.baseURL+"borrar/proyectos/"+id);
  }
}




