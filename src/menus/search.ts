import { viewTask } from '../prompt/getMenu.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function searchTask(taskList: any, busqueda: string) {
    let foundCount: number = 0;
    let foundList: string[] = [];
    for (let i: number = 0; i < taskList.length; i++) {
        if (taskList[i].titulo.toLowerCase().includes(busqueda.toLowerCase())) {
            foundCount++;
            foundList[foundCount] = taskList[i];
            console.log("[" + foundCount + "]" + taskList[i].titulo);
        }
        return chooseEdit(foundList, foundCount);
    }
}

export function chooseEdit(foundList: any, foundCount: any) {
    if (foundCount != 0) {
        console.log("\n¿Deseas ver los detalles de alguna tarea?");
        console.log("Introduce el numero para ver una tarea o 0 para volver.");
        let i: number = prompt();
        if (isNaN(i) || i == 0 || foundList[Math.floor(i).title == undefined]) {
            console.clear();
            return false;
        }
        else {
            return foundList[Math.floor(i)];
        }
    }
}