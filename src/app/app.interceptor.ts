import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    }
    return next.handle(request).pipe(tap(res => (null), (evt: any) => {
      console.log('evt', evt);
      if (evt.status && [401, 403, 404].includes(evt.status)) {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    }));
  }
}
