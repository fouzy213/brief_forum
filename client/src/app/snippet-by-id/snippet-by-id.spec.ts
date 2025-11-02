import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetById } from './snippet-by-id';

describe('SnippetById', () => {
  let component: SnippetById;
  let fixture: ComponentFixture<SnippetById>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetById]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetById);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
