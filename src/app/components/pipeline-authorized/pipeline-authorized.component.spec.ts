import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineAuthorizedComponent } from './pipeline-authorized.component';

describe('PipelineAuthorizedComponent', () => {
  let component: PipelineAuthorizedComponent;
  let fixture: ComponentFixture<PipelineAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineAuthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
