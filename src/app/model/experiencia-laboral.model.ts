import { TipoEmpleo } from "./tipo-empleo.model";

export class ExperienciaLaboral {
    id: Number = 0;
    nombre_empresa: string = "";
    es_trabajo_actual: boolean = false;
    fechaInicio: Date = new Date(0);
    fecha_fin: Date = new Date(0);
    descripcion: string = "";
    tipo_empleo: TipoEmpleo = new TipoEmpleo();
}





