import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { CharacterEquipment } from '../character-equipment/character-equipment.entity';
import { CharacterItem } from '../character-item/character-item.entity';
import { ItemAttribute } from '../item-attribute/item-attribute.entity';

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

  @OneToMany(() => ItemAttribute, item_attribute => item_attribute.item)
  item_attributes: ItemAttribute[];

  @OneToMany(
    () => CharacterEquipment,
    character_equipment => character_equipment.item,
  )
  character_equipment: CharacterEquipment[];
}
