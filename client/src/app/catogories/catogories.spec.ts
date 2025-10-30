import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catogories } from './catogories';

describe('Catogories', () => {
  let component: Catogories;
  let fixture: ComponentFixture<Catogories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catogories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Catogories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
