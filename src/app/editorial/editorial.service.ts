import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EditorialDetail } from './editorial-detail';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  private apiUrl: string = environment.baseUrl + 'editorials';

  constructor(private http: HttpClient) { }

  getEditorials(): Observable<EditorialDetail[]> {
    return this.http.get<EditorialDetail[]>(this.apiUrl);
  }

  getEditorial(id: string): Observable<EditorialDetail> {
    return this.http.get<EditorialDetail>(this.apiUrl + "/" + id);
  }
}
