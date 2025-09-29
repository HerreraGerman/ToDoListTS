import { warningText } from '../text/warning.ts';
import { chooseEdit } from '../menus/search.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function viewTask(taskList: any) {
    let foundCount: number = 0;
    let foundList: string[] = [];
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
    for (let i: number = 0; i < taskList.length; i++) {
        if (taskList[i].status == filter - 1 || filter == 1) {
            console.log("[" + (i + 1) + "] " + taskList[i].titulo);
            foundCount++;
            foundList[foundCount] = taskList[i];
        }
    }
    return chooseEdit(foundList, foundCount);
}