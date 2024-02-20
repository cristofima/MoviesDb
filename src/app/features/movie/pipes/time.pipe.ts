import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(runtime: number): string {
    const hours = parseInt((runtime / 60).toString(), 0);
    const minutes = runtime - hours * 60;
    let hoursText = "";
    let minutesText = "";

    if (hours) {
      hoursText = `${hours}h`;
    }

    if (minutes) {
      minutesText = `${minutes}m`;
    }

    let result = `${hoursText} ${minutesText}`;

    return result.trim();
  }

}
