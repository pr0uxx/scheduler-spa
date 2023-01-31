import {Observable} from "rxjs";
import {ODataParameters} from "../classes/ODataParameters";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export abstract class ACrudService<T>{
  abstract getById(id: number) : Observable<T>
  abstract get(params?: ODataParameters) : Observable<T[]>
  abstract post(dto: T) : Observable<T>
  abstract update(dto: T) : Observable<T>
  abstract delete(id: number) : Observable<any>
}

// @Injectable({
//   providedIn: 'root's
// })
export class CrudService<T> implements ACrudService<T>{
  private url? : string;

  constructor(private http: HttpClient, private controller: string) {
    this.url = `${environment.apiUrl}/${controller}`;
  }

  get(params?: ODataParameters): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}${params?.buildQueryString() ?? ''}`);
  }
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`)
  }
  post(dto: T): Observable<T> {
    return this.http.post<T>(`${this.url}`, dto);
  }
  update(dto: T): Observable<T> {
    return this.http.put<T>(`${this.url}`, dto);
  }
  delete(id: number) : Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}

export class crudServiceProvider {
  static getProvider<T>(routeDir: string) {
    return {
      provide: routeDir + 'Service',
      deps: [HttpClient],
      useFactory: (dep : HttpClient) => {
        return new CrudService<T>(dep, routeDir);
      }
    }
  }
}
