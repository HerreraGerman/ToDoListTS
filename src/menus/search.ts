import type { Task } from '../text/taskType.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function searchTask(taskList: Task[], busqueda: string): Task | null {
    const foundList: Task[] = [];
    const termino = busqueda.toLowerCase();

    for (const task of taskList) {
        const titulo = task.titulo.toLowerCase();
        const descripcion = task.descripcion.toLowerCase();
        if (titulo.includes(termino) || descripcion.includes(termino)) {
            foundList.push(task);
            console.log(`[${foundList.length}] ${task.titulo} - ${task.descripcion}`);
        }
    }
    return chooseEdit(foundList);
}

export function chooseEdit(foundList: Task[]): Task | null {
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