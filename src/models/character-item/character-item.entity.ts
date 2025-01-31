import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Item } from '../item/item.entity';
import { Character } from '../character/character.entity';

@Entity({ name: 'character_item' })
export class CharacterItem {
  @PrimaryGeneratedColumn({ name: 'character_item_id' })
  character_item_id: number;

  @ManyToOne(() => Character, character => character.character_items)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Item, item => item.character_items)
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
