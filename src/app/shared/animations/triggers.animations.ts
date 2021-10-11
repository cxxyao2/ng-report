import {
  trigger,
  state,
  animate,
  style,
  transition,
  keyframes,
} from '@angular/animations';

// time: maximum 2000ms. enter time must be less than leave time.
export const customSlide = trigger('customSlide', [
  transition(
    ':enter',
    [
      style({
        bottom: '-200px',
        opacity: '0.4',
      }),
      animate('{{ time }}ms', style({ bottom: '-5px', opacity: '1' })),
    ],
    { params: { time: '500' } }
  ),
  transition(':leave', animate('2s', style({ opacity: '0' }))),
]);

export const customRotate = trigger('customRotate', [
  transition(
    ':enter',
    [
      animate(
        '{{ time }}ms ease-in',
        keyframes([
          style({ transform: 'rotate(0deg)', opacity: '0.2' }),
          style({
            transform: 'rotate(360deg)',
            opacity: '0.9',
          }),
        ])
      ),
    ],
    { params: { time: '500' } }
  ),
  transition(':leave', animate('2s', style({ opacity: '0' }))),
]);

export const customFade = trigger('customFade', [
  transition(
    ':enter',
    [
      animate(
        '{{ time }}ms ease-in',
        keyframes([
          style({ transform: 'scale(1)', opacity: '0.2' }),
          style({ transform: 'scale(1.2)', opacity: '0.5' }),
          style({
            transform: 'scale(1)',
            opacity: '1',
          }),
        ])
      ),
    ],
    { params: { time: '500' } }
  ),
  transition(':leave', animate('2s', style({ opacity: '0' }))),
]);
