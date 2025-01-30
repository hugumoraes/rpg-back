import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Class } from '../class/class.entity';
import { Attribute } from '../attribute/attribute.entity';

@Entity({ name: 'class_attribute' })
export class ClassAttribute {
  @PrimaryGeneratedColumn({ name: 'class_attribute_id' })
  class_attribute_id: number;

  @ManyToOne(() => Class, c => c.class_attributes)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Attribute, attribute => attribute.class_attributes)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column({ default: 0 })
  default_value: number;
}
