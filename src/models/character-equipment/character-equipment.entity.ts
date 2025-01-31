import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

import { Character } from '../character/character.entity';
import { EquipmentSlot } from '../equipment-slot/equipment-slot.entity';
import { Item } from '../item/item.entity';

@Entity({ name: 'character_equipment' })
@Unique(['character', 'equipment_slot'])
export class CharacterEquipment {
  @PrimaryGeneratedColumn({ name: 'character_equipment_id' })
  character_equipment_id: number;

  @ManyToOne(() => Character, character => character.character_equipment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => EquipmentSlot, slot => slot.character_equipments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'equipment_slot_id' })
  equipment_slot: EquipmentSlot;

  @ManyToOne(() => Item, item => item.character_equipment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
