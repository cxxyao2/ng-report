import { FileSizePipe } from './file-size.pipe';

/**
 * Pipe Test
 */
fdescribe('FileSizePipe', () => {
  const pipe = new FileSizePipe(); // This pipe is pure. No need for BeforeEach

  it('transforms "1024*1024" to 1', () => {
    expect(pipe.transform(1024 * 1024)).toBe('1.00MB');
  });
});
