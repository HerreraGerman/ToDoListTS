import * as dates from 'date-fns';
import type { Task } from '../text/taskType.ts';

export function isNewEmptyCheck(newTask: Task) {
    if(newTask.titulo == "sin nombre" || newTask.titulo == "" || newTask.titulo == undefined || newTask.titulo == null)
        {
            return 'titulo';
        }
        return false;
}

export function dateCheck(dateString: string) {
    let result = dates.parseISO(dateString);
    if (isNaN(result.getTime())) {
        return false;
    }
    else {
        return true;
    }
}

export function rangeCheck(number: number, max: number) {
    if(!isNaN(number)) {
        number = Math.floor(number);
        return (number >= 1 && number <= max)
    }
    return false;
}