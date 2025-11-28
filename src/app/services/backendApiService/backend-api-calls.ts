import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiCalls {
  private apiUrl = 'http://127.0.0.1:8080/api/ask';
  constructor(private http: HttpClient) {}

  askQuestion(lawtext: string, question: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      lawText: lawtext,
      question,
    });
  }
}
