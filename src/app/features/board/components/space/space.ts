import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Player, Space } from '@features/board/board.models';

@Component({
  selector: 'app-space',
  imports: [CommonModule],
  templateUrl: './space.html',
  styleUrl: './space.css',
})
export class SpaceComponent {
  space = input<Space | null>(null);
  players = input<Player[]>([]);

  color = computed(() => {
    if (!this.space() || !this.space()!.color) {
      return null;
    }
    return this.space()!.color.toLowerCase().replace(' ', '-');
  });

  isMiddle(): boolean {
    const pos = this.space()?.position ?? -1;
    if (pos >= 12 && pos <= 20) {
      return true;
    }
    if (pos >= 32 && pos <= 40) {
      return true;
    }
    return false;
  }
}
