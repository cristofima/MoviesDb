import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'videoUrl'
})
export class VideoUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(key: string, ...args: unknown[]): SafeResourceUrl {
    let url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
