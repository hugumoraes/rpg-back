import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CharacterEquipment } from '../character-equipment/character-equipment.entity';

@Entity({ name: 'equipment_slot' })
export class EquipmentSlot {
  @PrimaryGeneratedColumn({ name: 'equipment_slot_id' })
  equipment_slot_id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @OneToMany(
    () => CharacterEquipment,
    character_equipment => character_equipment.equipment_slot,
  )
  character_equipments: CharacterEquipment[];
}
