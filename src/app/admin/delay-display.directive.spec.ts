import { DelayDisplayDirective } from './delay-display.directive';
import { Component, Directive, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div>
      <h2 id="h2A">A is displayed</h2>
      <h2 id="h2B" *delayRendering="1000">B is displayed</h2>
      <h2 id="h2C" *delayRendering="2000">C is displayed</h2>
    </div>
  `,
})
class TestComponent {}

/**
 * Async Structural Directive
 */
fdescribe('DelayDisplayDirective', () => {
  let des: any;
  let fixture: any;
  let comp: any;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DelayDisplayDirective, TestComponent],
    }).createComponent(TestComponent);
    comp = fixture.componentInstance;

    // all elements with an attached Structural directive
    des = fixture.debugElement.queryAllNodes(
      By.directive(DelayDisplayDirective)
    );
  });

  it('should have two structural elements', () => {
    expect(des.length).toBe(2);
  });

  it('should display "A is displayed" after created', () => {
    fixture.detectChanges();
    const divDe = fixture.debugElement.query(By.css('div'));
    const divEl = divDe.nativeElement as HTMLDivElement;
    expect(divEl.innerHTML).toContain('A is displayed');
    expect(divEl.innerHTML).not.toContain(
      'B is displayed',
      'B should not be displayed when created'
    );
  });

  it('should display B after one second ', fakeAsync(() => {
    fixture.detectChanges();
    const divDe = fixture.debugElement.query(By.css('div'));
    const divEl = divDe.nativeElement as HTMLDivElement;
    tick(1000);
    fixture.detectChanges();
    expect(divEl.innerHTML).toContain('B is displayed');

    flush();
  }));
});
