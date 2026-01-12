import { Component, signal } from '@angular/core';
import { BackendApiCalls } from '../../../services/backendApiService/backend-api-calls';
import { ResponseFormatterService } from '../../../services/responseFormatterService/response-formatter.service';
import { PrimeIcons } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-law-qa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './law-qa.html',
  styleUrl: './law-qa.css',
})
export class LawQa {
  lawtext = signal('');
  question = signal('');
  selectedFile = signal<File | null>(null);
  answer = signal('');
  formattedAnswer = signal<any>(null);
  loading = signal(false);

  constructor(
    private backendservice: BackendApiCalls,
    private responseFormatter: ResponseFormatterService
  ) {}


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  submit() {
    const file = this.selectedFile();
    if (!file) {
      this.answer.set('يرجى اختيار ملف PDF أولاً.');
      return;
    }
    this.loading.set(true);
    this.answer.set('');
    this.backendservice.askQuestion(file, this.question()).subscribe({
      next: (response) => {
        console.log(response.answer);
        this.answer.set(response.answer);
        this.loading.set(false);
      },
      error: () => {
        this.answer.set('حدث خطأ أثناء جلب الإجابة.');
        this.loading.set(false);
      },
    });
  }

  submit1() {
    this.loading.set(true);
    this.backendservice.extract(this.lawtext()).subscribe({
      next: (response) => {
        let dataToFormat = response.entities || response.entities_raw;
        if (!dataToFormat) {
          this.answer.set(response.error || 'لم يتم إرجاع أي بيانات');
        } else {
          const formatted = this.responseFormatter.formatJsonResponse(dataToFormat);
          this.formattedAnswer.set(dataToFormat);
          this.answer.set(formatted);
        }
        this.loading.set(false);
      },
      error: () => {
        this.answer.set('حدث خطأ أثناء استخراج البيانات.');
        this.loading.set(false);
      },
    });
  }

  submit2() {
    this.loading.set(true);
    this.answer.set('');
    this.formattedAnswer.set(null);
    this.backendservice.sendquery({ query: this.question() }).subscribe({
      next: (response) => {
        if (response.answer) {
          try {
            console.log(response.answer);
            const parsed = JSON.parse(response.answer);
            const formatted = this.responseFormatter.formatJsonResponse(parsed);
            this.formattedAnswer.set(parsed);
            this.answer.set(formatted);
          } catch {
            this.answer.set(response.answer);
          }
        } else {
          this.answer.set('لم يتم إرجاع إجابة');
        }
        this.loading.set(false);
      },
      error: () => {
        this.answer.set('حدث خطأ أثناء إرسال الاستعلام.');
        this.loading.set(false);
      },
    });
  }
}
