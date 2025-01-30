import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Character } from '../character/character.entity';
import { Attribute } from '../attribute/attribute.entity';

@Entity({ name: 'character_attribute' })
export class CharacterAttribute {
  @PrimaryGeneratedColumn()
  character_attribute_id: number;

  @ManyToOne(() => Character, character => character.character_attributes)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Attribute, attribute => attribute.character_attributes)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column({ type: 'integer' })
  value: number;
}
