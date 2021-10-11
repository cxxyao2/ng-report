import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

export const slideAnimation = animation([
  style({
    bottom: '-200px',
    opacity: '0.4',
  }),
  animate('{{ time }}', style({ bottom: '-5px', opacity: '1' })),
]);
