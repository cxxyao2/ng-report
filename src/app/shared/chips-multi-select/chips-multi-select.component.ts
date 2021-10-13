import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-chips-multi-select',
  templateUrl: './chips-multi-select.component.html',
  styleUrls: ['./chips-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipsMultiSelectComponent,
      multi: true,
    },
  ],
})
export class ChipsMultiSelectComponent
  implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor
{
  @Input() options: string[] = [];
  @ViewChild(MatChipList) chipList!: MatChipList;
  destroy$: Subject<void> = new Subject<void>();
  value: string[] = [];
  sub?: Subscription;
  disabled = false;

  onChange!: (value: string[]) => void;

  constructor() {}

  ngOnInit(): void {}

  toggleSelection(chip: MatChip): void {
    if (!this.disabled) {
      chip.toggleSelected();
    }
  }

  writeValue(value: string[]): void {
    if (this.chipList && value) {
      // when form value set when chips list initialized
      this.selectChips(value);
    } else if (value) {
      // when chips not initialized
      this.value = value;
    }
  }

  selectChips(value: string[]): void {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  propagateChange(value: string[]) {
    if (this.onChange) {
      this.onChange(value);
    }
  }

  ngAfterViewInit(): void {
    this.sub = this.chipList.chipSelectionChanges
      .pipe(
        map((event) => event.source),
        takeUntil(this.destroy$)
      )
      .subscribe((chip: MatChip) => {
        if (chip.selected) {
          this.value = [...this.value, chip.value];
        } else {
          this.value = this.value.filter((obj) => obj !== chip.value);
        }
        this.propagateChange(this.value);
      });
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
