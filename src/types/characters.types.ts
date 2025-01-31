import { ClassAttribute } from '../models/class-attribute/class-attribute.entity';

export interface CreateCharacter {
  user_id: number;
  class_id: number;
  name: string;
}

export interface CreateCharacterWithAttributes {
  class_attributes: ClassAttribute[];
  class_id: number;
  name: string;
  user_id: number;
}

export interface CreateCharacterAttribute {
  character_id: number;
  attribute_id: number;
  value: number;
}

export interface CreateCharacterItem {
  character_id: number;
  item_id: number;
  value: number;
}

export interface GetCharacterById {
  character_id: number;
  relations: string[];
}
