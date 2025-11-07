import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addsnippet } from './addsnippet';

describe('Addsnippet', () => {
  let component: Addsnippet;
  let fixture: ComponentFixture<Addsnippet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addsnippet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addsnippet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
