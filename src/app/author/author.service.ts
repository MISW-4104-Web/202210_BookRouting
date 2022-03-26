import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorDetail } from './author-detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl: string = environment.baseUrl + 'authors';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<AuthorDetail[]> {
    return this.http.get<AuthorDetail[]>(this.apiUrl);
  }

  getAuthor(id: string): Observable<AuthorDetail> {
    return this.http.get<AuthorDetail>(this.apiUrl + "/" + id);
  }

}
