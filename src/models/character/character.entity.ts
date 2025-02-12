import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { CharacterAttribute } from '../character-attribute/character-attribute.entity';
import { CharacterEquipment } from '../character-equipment/character-equipment.entity';
import { CharacterItem } from '../character-item/character-item.entity';
import { Class } from '../class/class.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn({ name: 'character_id' })
  character_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => Class, c => c.class_id)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => User, u => u.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => CharacterAttribute,
    character_attribute => character_attribute.character,
  )
  character_attributes: CharacterAttribute[];

  @OneToMany(() => CharacterItem, character_item => character_item.character)
  character_items: CharacterItem[];

  @OneToMany(
    () => CharacterEquipment,
    character_equipment => character_equipment.character,
  )
  character_equipment: CharacterEquipment[];

  @Column({ type: 'boolean', default: true })
  alive: boolean;

  @Column({ type: 'int', default: 1 })
  level: number;

  @Column({ type: 'int', default: 0 })
  xp: number;

  @Column({ type: 'int', default: 0 })
  money: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
