import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

export interface IFileData {
  content: Blob;
  contentType: string;
  fileDownloadName: string;
}

export type IHttpHeaders = { [name: string]: string | string[] };

@Injectable()
export class HttpService implements OnDestroy {
  public componentDestroyed: Subject<boolean> = new Subject();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  public ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  public DELETE(passedUrl: string): Observable<any> {
    // DELETE to api
    return this.http
      .delete(passedUrl, this.getOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  public GET(passedUrl: string): Observable<any> {
    // GET from api
    return this.http
      .get(passedUrl, this.getOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  public OPTIONS(passedUrl: string): Observable<any> {
    // OPTIONS to api
    return this.http
      .options(passedUrl, this.getOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  public PATCH(passedUrl: string, body: any): Observable<any> {
    // PATCH to api
    return this.http
      .patch(passedUrl, JSON.stringify(body), this.getOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  public POST(passedUrl: string, body: any): Observable<any> {
    // POST to api
    return this.http
      .post(passedUrl, JSON.stringify(body), this.getOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  public POSTDOWNLOAD(passedUrl: string, body: any): Observable<IFileData> {
    // POST to api
    return this.http
      .post(passedUrl, JSON.stringify(body), this.getDownloadOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        ),
        map(
          (response: HttpResponse<Blob>) =>
            <IFileData>{
              content: response.body,
              contentType: response.headers.get('Content-Type'),
              fileDownloadName: response.headers
                .get('Content-Disposition')
                .match(/filename=("?)([^";]+)\1(?:;|$)/)[2],
            }
        )
      );
  }

  public POSTUPLOAD(passedUrl: string, body: any): Observable<any> {
    // POST to api
    return this.http
      .post(passedUrl, body, this.getUploadOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  public PUT(passedUrl: string, body: any): Observable<any> {
    // PUT to api
    return this.http
      .put(passedUrl, JSON.stringify(body), this.getOptions())
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.authenticationService.handleError(error)
        )
      );
  }

  /* istanbul ignore next */
  private getDownloadOptions(): {
    headers: IHttpHeaders;
    observe: 'response';
    responseType: 'blob';
  } {
    return {
      headers: this.authenticationService.defaultHeaderOptions(),
      observe: 'response',
      responseType: 'blob',
    };
  }

  /* istanbul ignore next */
  private getUploadOptions(): {
    headers: IHttpHeaders;
  } {
    return {
      headers: this.authenticationService.uploadHeaderOptions(),
    };
  }

  /* istanbul ignore next */
  private getOptions(): {
    headers: IHttpHeaders;
  } {
    return { headers: this.authenticationService.defaultHeaderOptions() };
  }
}
