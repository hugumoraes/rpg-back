import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CharacterItem } from '../character-item/character-item.entity';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn({ name: 'item_id' })
  item_id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 0 })
  value: number;

  @Column({ type: 'varchar', length: 25, default: 'common' })
  rarity: string;

  @OneToMany(() => CharacterItem, character_item => character_item.item)
  character_items: CharacterItem[];
}
