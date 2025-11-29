import { Component, signal } from '@angular/core';
import { BackendApiCalls } from '../../../services/backendApiService/backend-api-calls';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-law-qa',
  imports: [FormsModule, CommonModule],
  templateUrl: './law-qa.html',
  styleUrl: './law-qa.css',
})
export class LawQa {
  lawtext = signal('');
  question = signal('');
  answer = signal('');
  loading = signal(false);

  constructor(private backendservice: BackendApiCalls) {}

  submit() {
    this.loading.set(true);
    this.answer.set('');
    this.backendservice.askQuestion(this.lawtext(), this.question()).subscribe(
      (response) => {
        this.answer.set(response.answer);
        this.loading.set(false);
      },
      (error) => {
        this.answer.set('An error occurred while fetching the answer.');
        this.loading.set(false);
      }
    );
  }
  submit1() {
    this.loading.set(true);
    this.answer.set('');
    this.backendservice.extract(this.lawtext()).subscribe(
      (response) => {
        this.answer.set(response.answer);
        this.loading.set(false);
      },
      (error) => {
        this.answer.set('An error occurred while fetching the answer.');
        this.loading.set(false);
      }
    );
  }
}
