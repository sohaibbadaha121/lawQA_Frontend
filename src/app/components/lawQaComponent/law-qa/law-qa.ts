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
  formattedAnswer = signal<any>(null);
  loading = signal(false);

  constructor(private backendservice: BackendApiCalls) {}

  private formatJsonResponse(data: any): string {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        return data;
      }
    }

    let formatted = '';

    // Handle array of documents
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        formatted += this.formatDocument(item, index + 1);
        if (index < data.length - 1) formatted += '\n\n───────────────────\n\n';
      });
    } else if (typeof data === 'object' && data !== null) {
      formatted = this.formatDocument(data, 1);
    } else {
      formatted = String(data);
    }

    return formatted;
  }

  private formatDocument(doc: any, num: number): string {
    let result = `📄 مستند رقم ${num}\n\n`;

    const fieldLabels: { [key: string]: string } = {
      source_document: '📁 المستند المصدر',
      case_number: '📋 رقم القضية',
      answer: '✅ الإجابة',
      plaintiff: '👤 المدعي',
      defendant: '👥 المدعى عليه',
      court_name: '⚖️ المحكمة',
      judge: '👨‍⚖️ القاضي',
      verdict: '📜 الحكم',
    };

    for (const [key, value] of Object.entries(doc)) {
      if (value === null || value === undefined) continue;

      const label = fieldLabels[key] || key;

      if (Array.isArray(value)) {
        result += `${label}:\n`;
        value.forEach((item, idx) => {
          result += `  ${idx + 1}. ${item}\n`;
        });
        result += '\n';
      } else if (typeof value === 'object') {
        result += `${label}:\n${JSON.stringify(value, null, 2)}\n\n`;
      } else {
        result += `${label}: ${value}\n\n`;
      }
    }

    return result;
  }

  submit() {
    this.loading.set(true);
    this.answer.set('');
    this.formattedAnswer.set(null);

    this.backendservice.askQuestion(this.lawtext(), this.question()).subscribe(
      (response) => {
        console.log(response);
        this.answer.set(response.answer);
        this.loading.set(false);
      },
      (error) => {
        this.answer.set('حدث خطأ أثناء جلب الإجابة.');
        this.loading.set(false);
      }
    );
  }

  submit1() {
    this.loading.set(true);
    this.answer.set('');
    this.formattedAnswer.set(null);

    this.backendservice.extract(this.lawtext()).subscribe(
      (response) => {
        console.log(response);

        let dataToFormat;
        if (response.entities) {
          dataToFormat = response.entities;
        } else if (response.entities_raw) {
          dataToFormat = response.entities_raw;
        } else if (response.error) {
          this.answer.set('خطأ: ' + response.error);
          this.loading.set(false);
          return;
        } else {
          this.answer.set('لم يتم إرجاع أي بيانات');
          this.loading.set(false);
          return;
        }

        const formatted = this.formatJsonResponse(dataToFormat);
        this.formattedAnswer.set(dataToFormat);
        this.answer.set(formatted);
        this.loading.set(false);
      },
      (error) => {
        console.error(error);
        this.answer.set('حدث خطأ أثناء استخراج البيانات.');
        this.loading.set(false);
      }
    );
  }

  submit2() {
    this.loading.set(true);
    this.answer.set('');
    this.formattedAnswer.set(null);

    this.backendservice.sendquery({ query: this.question() }).subscribe(
      (response) => {
        console.log(response);

        if (response.answer) {
          // Check if answer is JSON
          try {
            const parsed = JSON.parse(response.answer);
            const formatted = this.formatJsonResponse(parsed);
            this.formattedAnswer.set(parsed);
            this.answer.set(formatted);
          } catch {
            // Not JSON, display as is
            this.answer.set(response.answer);
          }
        } else {
          this.answer.set('لم يتم إرجاع إجابة');
        }

        this.loading.set(false);
      },
      (error) => {
        this.answer.set('حدث خطأ أثناء إرسال الاستعلام.');
        this.loading.set(false);
      }
    );
  }
}
