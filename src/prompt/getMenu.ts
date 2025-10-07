import { warningText } from '../text/warning.ts';
import { chooseEdit } from '../menus/search.ts';
import type { Task } from '../text/taskType.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function viewTask(taskList: Task[]): void | ReturnType<typeof chooseEdit>{
    let foundCount: number = 0;
    let foundList: Task[] = [];
    let filter: number = Number(prompt());
    let filterType: string = "";
    console.clear();
    switch (filter) {
        case 1:
            filterType = "";
            break;
        case 2:
            filterType = " pendientes";
            break;
        case 3:
            filterType = " en curso";
            break;
        case 4:
            filterType = " terminadas";
            break;
        case 0:
            return;
        default:
            warningText(filterType);
            return;
    }
    console.log("Estas son las tareas relacionadas" + filterType + ": \n");

    for (const task of taskList) {
        if (task.status == filter - 1 || filter == 1) {
            console.log(`[${foundList.length + 1}] ${task.titulo}`);
            foundList.push(task);
        }
    }
    return chooseEdit(foundList);
}