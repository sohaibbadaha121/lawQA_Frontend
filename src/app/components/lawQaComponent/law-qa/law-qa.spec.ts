import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawQa } from './law-qa';

describe('LawQa', () => {
  let component: LawQa;
  let fixture: ComponentFixture<LawQa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawQa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawQa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
