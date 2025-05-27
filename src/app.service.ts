import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number) {
    console.log(`Root handler`);
    const emojis = this.getEmojis();
    const emojiIndex = index || Math.floor(Math.random() * emojis.length);
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
