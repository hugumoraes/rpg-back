/* ---------- External ---------- */

/* ---------- Types ---------- */
import {
  CreateCharacter,
  GetCharacterById,
} from '../../types/characters.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Character } from '../../models/character/character.entity';

export class CharacterRepository {
  private readonly character_repository =
    PostgresDataSource.getRepository(Character);

  public get_character_by_id = async ({
    character_id,
  }: GetCharacterById): Promise<Character | null> => {
    const character = await this.character_repository.findOne({
      where: {
        character_id,
      },
      relations: [
        'class',
        'character_attributes',
        'character_attributes.attribute',
      ],
    });

    return character;
  };

  public create_character = async ({
    class_id,
    user_id,
    name,
  }: CreateCharacter): Promise<Character | null> => {
    const character = await this.character_repository.save({
      class: {
        class_id,
      },
      user: {
        user_id,
      },
      name,
    });

    return character;
  };
}
