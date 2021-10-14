import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  const pipe = new FileSizePipe();

  it('transforms "1024*1024" to 1', () => {
    expect(pipe.transform(1024 * 1024)).toBe('1.00MB');
  });
});
