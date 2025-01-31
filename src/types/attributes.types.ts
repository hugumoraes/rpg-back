export interface GetAttributeById {
  attribute_id: number;
}

export interface GetClassAttributesByClassId {
  class_id: number;
  relations?: string[];
}
