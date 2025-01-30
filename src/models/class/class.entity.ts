import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Character } from '../character/character.entity';
import { ClassAttribute } from '../class-attribute/class-attribute.entity';

@Entity({ name: 'classes' })
export class Class {
  @PrimaryGeneratedColumn({ name: 'class_id' })
  class_id: number;

  @OneToMany(() => Character, c => c.character_id)
  character: Character[];

  @OneToMany(() => ClassAttribute, class_attribute => class_attribute.class)
  class_attributes: ClassAttribute[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
}
