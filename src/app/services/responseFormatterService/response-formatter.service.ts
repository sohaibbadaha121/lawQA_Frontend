import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResponseFormatterService {
  formatJsonResponse(data: any): string {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        return data;
      }
    }

    let formatted = '';

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
    const technicalFields = ['id', 'document_id', 'created_at', 'raw_entities'];

    const meaningfulKeys = Object.entries(doc)
      .filter(([key, value]) => {
        if (value === null || value === undefined || technicalFields.includes(key)) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
      .map(([key]) => key);
    let header = `📄 النتيجة رقم ${num}`;

    if (meaningfulKeys.includes('from_entity') || meaningfulKeys.includes('relationship_type')) {
      let result = '';
      const fromEntity = doc['from_entity'] || '';
      const relationshipType = doc['relationship_type'] || '';
      const toEntity = doc['to_entity'] || '';

      const cleanRelationType = relationshipType.replace(/_/g, ' ');

      result = `${fromEntity} ${cleanRelationType} ${toEntity}\n\n`;
      return result;
    } else if (meaningfulKeys.includes('verdict') || meaningfulKeys.includes('decision')) {
      header = `⚖️ تفاصيل الحكم القضائي`;
    } else if (meaningfulKeys.includes('answer')) {
      header = `✅ الإجابة القانونية`;
    } else if (meaningfulKeys.includes('case_number') && meaningfulKeys.length < 5) {
      header = `📋 بيانات القضية المختصرة`;
    }

    const fieldLabels: { [key: string]: string } = {
      source_document: '📁 المستند المصدر',
      case_number: '📋 رقم القضية',
      judge: '👨‍⚖️ القاضي',
      plaintiff: '👤 المدعي',
      defendant: '👥 المدعى عليه',
      court_name: '⚖️ المحكمة',
      verdict: '📜 منطوق الحكم',
      decision: '🏁 القرار النهائي',
      reasoning: '🧠 الأسباب والحيثيات',
      legal_articles: '⚖️ المواد القانونية الاسترشادية',
    };

    let result = `${header}\n\n`;

    for (const key of meaningfulKeys) {
      let value = doc[key];
      const label = fieldLabels[key] || key;

      if (typeof value === 'string') {
        value = value.replace(/_/g, ' ');
      }

      if (Array.isArray(value)) {
        result += `${label}:\n`;
        value.forEach((item, idx) => {
          result += `  ${idx + 1}. ${item}\n`;
        });
        result += '\n';
      } else {
        if (meaningfulKeys.length === 1 && key !== 'source_document') {
          return `${header}:\n${value}\n`;
        }
        result += `${label}: ${value}\n\n`;
      }
    }

    return result;
  }
}
