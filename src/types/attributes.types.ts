export interface GetAttributeById {
  attribute_id: number;
}

export interface GetClassAttributesByClassId {
  class_id: number;
  relations?: string[];
}

export interface CreateCharacterAttribute {
  character_id: number;
  attribute_id: number;
  value: number;
}
