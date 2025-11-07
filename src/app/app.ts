import { Component, signal } from '@angular/core';
import { LawQa } from './components/lawQaComponent/law-qa/law-qa';

@Component({
  selector: 'app-root',
  imports: [LawQa],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('law_QA_Frontend');
}
