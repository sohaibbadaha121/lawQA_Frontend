import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiCalls {
  private apiUrl = 'http://localhost:8080/api/law/ask';
  constructor(private http: HttpClient) {}

  askQuestion(lawtext: string, question: string): Observable<any> {
    return this.http.post(this.apiUrl, { lawtext, question });
  }
}
