import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router, private route: ActivatedRoute) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error('Error Event');
                    } else {
                        console.log(`error status : ${error.status} ${error.statusText}`);
                        switch (error.status) {
                            case 404:
                                this.router.navigate(['/error-404'], { relativeTo: this.route, skipLocationChange: true });
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    return throwError(error);
                }
            }));
    }
}
