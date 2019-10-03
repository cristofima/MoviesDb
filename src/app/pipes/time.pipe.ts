import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const hours = parseInt((value / 60).toString(), 0);
    const minutes = Number(value) - hours * 60;
    const hoursText = hours === 1 ? 'hora' : 'horas';
    const minutesText = minutes === 1 ? 'minuto' : 'minutos';

    return `${hours} ${hoursText} ${minutes} ${minutesText}`;
  }

}
