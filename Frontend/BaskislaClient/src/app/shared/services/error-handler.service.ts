import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http/http';
import { Router } from '@angular/router';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor{

  constructor(private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(errorMessage);
      })
    )
  }

  private handleError = (error: HttpErrorResponse) : string
  {
    if(error.status === 404)
    {
      return this.handleNotFound(error);
    }
    else if(error.status === 400)
      return this.handleBadRequest(error);
  }

  private handleNotFound(error: HttpErrorResponse) : string
  {
    this._router.navigate(['/404']);
    return error.message;
  }

  private handleBadRequest(error: HttpErrorResponse) : string
  {
    //this._router.navigate
    return "";
  }
}
