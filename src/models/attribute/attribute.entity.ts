import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { CharacterAttribute } from '../character-attribute/character-attribute.entity';
import { ClassAttribute } from '../class-attribute/class-attribute.entity';

@Entity({ name: 'attributes' })
export class Attribute {
  @PrimaryGeneratedColumn({ name: 'attribute_id' })
  attribute_id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  description: string;

  @OneToMany(
    () => CharacterAttribute,
    character_attribute => character_attribute.attribute,
  )
  character_attributes: CharacterAttribute[];

  @OneToMany(() => ClassAttribute, class_attribute => class_attribute.attribute)
  class_attributes: ClassAttribute[];
}
