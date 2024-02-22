import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'borderClass'
})
export class BorderClassPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    let percentage = value * 10;

    if (percentage == null || percentage == 0) {
      return "#D8CFCD";
    } else if (percentage <= 6) {
      return "#FF0000";
    } else if (percentage <= 12) {
      return "#FF4000";
    } else if (percentage <= 18) {
      return "#FF8000";
    } else if (percentage <= 23) {
      return "#FFBF00";
    } else if (percentage <= 29) {
      return "#FFFF00";
    } else if (percentage <= 35) {
      return "#BFFF00";
    } else if (percentage <= 41) {
      return "#80FF00";
    } else if (percentage <= 47) {
      return "#40FF00";
    } else if (percentage <= 53) {
      return "#00FF00";
    } else if (percentage <= 59) {
      return "#00FF40";
    } else if (percentage <= 65) {
      return "#00FF80";
    } else if (percentage <= 71) {
      return "#00FFBF";
    } else if (percentage <= 76) {
      return "#00FFFF";
    } else if (percentage <= 82) {
      return "#00BFFF";
    } else if (percentage <= 88) {
      return "#0080FF";
    } else if (percentage <= 94) {
      return "#0040FF";
    } else {
      return "#0000FF";
    }
  }

}
