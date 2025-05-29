import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number) {
    console.log(`Root handler`);
    const emojis = this.getEmojis();
    console.log(index);
    const emojiIndex =
      typeof index !== 'undefined'
        ? index
        : Math.floor(Math.random() * emojis.length);
    console.log(emojiIndex);
    //return random emoji
    return emojis[emojiIndex];
  }

  getEmojis() {
    return [
      '🌟',
      '🍕',
      '🚀',
      '🐶',
      '🎉',
      '🌈',
      '🔥',
      '😎',
      '🍩',
      '📚',
      '🧃',
      '🌻',
      '💡',
      '🎮',
      '🐙',
    ];
  }
}
