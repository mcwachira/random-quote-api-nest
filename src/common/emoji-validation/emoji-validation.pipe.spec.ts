import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiPipe = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(emojiPipe).toBeDefined();
  });
  it(`should return undefined if no value is passed in`, () => {
    const result = emojiPipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it(`should throw a bad request error if value is not a number`, () => {
    const result = () => emojiPipe.transform(`Not a number`);
    expect(result).toThrow(BadRequestException);
  });

  it(`should throw a bad request error if value is less than 0`, () => {
    const result = () => emojiPipe.transform(-1);
    expect(result).toThrow(BadRequestException);
  });
  it(`should throw a bad request error if value is greated than 15`, () => {
    const result = () => emojiPipe.transform(16);
    expect(result).toThrow(BadRequestException);
  });
  it(`should return the respective string input as a number`, () => {
    const result = emojiPipe.transform(`5`);
    expect(result).toEqual(5);
  });
});
