import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiCalls {
  private apiUrl = 'http://127.0.0.1:8000/api/ask';
  private extractUrl = 'http://127.0.0.1:8000/api/extract';

  constructor(private http: HttpClient) {}

  askQuestion(lawtext: string, question: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      lawText: lawtext,
      question,
    });
  }
  extract(lawtext: string): Observable<any> {
    return this.http.post(this.extractUrl, {
      lawText: lawtext,
    });
  }
}
