export interface CreateCharacter {
  user_id: number;
  class_id: number;
  name: string;
}

export interface GetCharacterById {
  character_id: number;
}
