import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineAllComponent } from './pipeline-all.component';

describe('PipelineAllComponent', () => {
  let component: PipelineAllComponent;
  let fixture: ComponentFixture<PipelineAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
