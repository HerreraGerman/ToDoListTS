import { taskDetail } from './taskDetail.ts';
import { viewTask } from '../prompt/getMenu.ts';
import type { ITask } from '../task/taskPrototype.ts';
import { searchTask } from '../menus/search.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function mainMenu() {
    console.log("¿Que desea hacer?");
    console.log("[1] Ver mis tareas");
    console.log("[2] Buscar una tarea");
    console.log("[3] Agregar una tarea");
    console.log("[0] Salir\n");
}

export function makeMenu(task: ITask, estados: Map<number, string>, dificultades: Map<number, string>, nueva: boolean) {
    if (nueva == true) {
        console.log("Estas creando una nueva tarea!");
    }
    else {
        console.log("Estas editando una tarea!");
    }
    console.log("Fecha de creacion: " + task.fechaCreacion);
    console.log("Ultima edicion: " + task.ultimaEdicion);
    console.log("[1] Titulo: " + task.titulo);
    console.log("[2] Descripcion: "  + task.descripcion);
    console.log("[3] Estado: " + estados.get(task.status));
    console.log("[4] Dificultad: " + dificultades.get(task.dificultad));
    console.log("[5] Vencimientos: " + task.vencimiento);
    console.log("[0] Guardar tarea");
    console.log("[-1] Cancelar Tarea");
}

export function searchMenu(taskList: ITask[]) {
    console.clear();
    let busqueda: string = '';
    console.log("Introduce el titulo de una tarea para buscarla: ")
    busqueda = prompt() || '';
    taskDetail(searchTask(taskList, busqueda));
}

export function viewMenu(taskList: ITask[]): ITask | null {
    console.clear();
    if (taskList.length === 0) {
        console.log("Tu lista de tareas se encuentra vacia!");
        return null;
    }
    else {
        console.log("¿Que tareas deseas ver?");
        console.log("[1] Ver todas las tareas");
        console.log("[2] Ver tareas pendientes");
        console.log("[3] Ver tareas en curso");
        console.log("[4] Ver tareas terminadas");
        console.log("[0] Volver");

        const selectedTask = viewTask(taskList);
        return selectedTask ?? null;
    }
}