import { format } from 'date-fns';
import type { Task } from '../text/taskType.ts';

class task implements Task {
    titulo = "sin nombre";
    descripcion = "sin descripcion";
    status = 1;
    dificultad = 1;
    vencimiento = "";
    fechaCreacion = format(new Date, 'yyyy/MM/dd - hh:mm a') + ' Hora Estandar Argentina';
    ultimaEdicion = this.fechaCreacion;
}

export { task };