import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'certification'
})
export class CertificationPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value === "G") {
      return "All ages admitted";
    } else if (value === "PG") {
      return "Some material may not be suitable for children under 10";
    } else if (value === "PG-13") {
      return "Some material may be inappropriate for children under 13";
    } else if (value === "R") {
      return "Under 17 requires accompanying parent or adult guardian 21 or older";
    } else if (value === "NC-17") {
      return "These films contain excessive graphic violence, intense or explicit sex, depraved, abhorrent behavior, explicit drug abuse, strong language, explicit nudity, or any other elements which, at present, most parents would consider too strong and therefore off-limits for viewing by their children and teens";
    } else {
      return "";
    }
  }

}
