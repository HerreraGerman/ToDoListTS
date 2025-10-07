import type { Task } from '../text/taskType.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function searchTask(taskList: Task[], busqueda: string): Task | false {
    const foundList: Task[] = [];

    for (const task of taskList) {
        if (task.titulo.toLowerCase().includes(busqueda.toLowerCase())) {
            foundList.push(task);
            console.log("[" + foundList.length + "]" + task.titulo);
        }
    }
    return chooseEdit(foundList);
}

export function chooseEdit(foundList: Task[]): Task | false {
    if (foundList.length = 0) {
        return false;
    }

    console.log("\n¿Deseas ver los detalles de alguna tarea?");
    console.log("Introduce el numero para ver una tarea o 0 para volver.\n");
    let i: number = prompt();
    if (isNaN(i) || i === 0 || i > foundList.length) {
            console.clear();
            return false;
        }
    return foundList[i - 1] ?? false;
}