import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Item } from '../item/item.entity';
import { Attribute } from '../attribute/attribute.entity';

@Entity({ name: 'item_attribute' })
export class ItemAttribute {
  @PrimaryGeneratedColumn()
  item_attribute_id: number;

  @ManyToOne(() => Item, item => item.item_attributes)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => Attribute, attribute => attribute.character_attributes)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column({ type: 'integer' })
  value: number;
}
