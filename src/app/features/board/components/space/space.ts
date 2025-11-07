import { Component, computed, effect, input } from '@angular/core';
import { Player, Space } from '@features/board/board.models';

@Component({
  selector: 'app-space',
  imports: [],
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
    return this.space()!.color.toLowerCase();
  });

  ngOnInit(): void {
    console.log('Space initialized:', this.space());
  }
}
