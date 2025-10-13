import type { ITask } from '../task/taskPrototype.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function searchTask(ITaskList: ITask[], busqueda: string): ITask | null {
    const foundList: ITask[] = [];
    const termino = busqueda.toLowerCase();

    for (const ITask of ITaskList) {
        const titulo = ITask.titulo.toLowerCase();
        const descripcion = ITask.descripcion.toLowerCase();
        if (titulo.includes(termino) || descripcion.includes(termino)) {
            foundList.push(ITask);
            console.log(`[${foundList.length}] ${ITask.titulo} - ${ITask.descripcion}`);
        }
    }
    return chooseEdit(foundList);
}

export function chooseEdit(foundList: ITask[]): ITask | null {
    if (foundList.length === 0) {
        console.log("No se encontraron coincidencias!");
        return null;
    }

    console.log("\n¿Deseas ver los detalles de alguna tarea?");
    console.log("Introduce el numero para ver una tarea o 0 para volver.\n");

    const input = prompt();
    const i: number = Number(input);
    if (isNaN(i) || i === 0 || i > foundList.length) {
            console.clear();
            return null;
        }
    return foundList[i - 1] ?? null;
}