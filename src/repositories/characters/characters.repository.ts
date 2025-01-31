/* ---------- External ---------- */
import { EntityManager } from 'typeorm';

/* ---------- Types ---------- */
import {
  CreateCharacter,
  CreateCharacterAttribute,
  CreateCharacterItem,
  CreateCharacterWithAttributes,
  GetCharacterById,
  GetCharacters,
} from '../../types/characters.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';
import { logger } from '../../common/utils/logs';

/* ---------- Models ---------- */
import { Character } from '../../models/character/character.entity';
import { CharacterAttribute } from '../../models/character-attribute/character-attribute.entity';
import { CharacterItem } from '../../models/character-item/character-item.entity';

export class CharacterRepository {
  private readonly logger = logger;

  private readonly character_repository =
    PostgresDataSource.getRepository(Character);

  private readonly character_attribute_repository =
    PostgresDataSource.getRepository(CharacterAttribute);

  private readonly character_item_repository =
    PostgresDataSource.getRepository(CharacterItem);

  public get_character_by_id = async ({
    character_id,
    user_id,
    relations,
  }: GetCharacterById): Promise<Character | null> => {
    const character = await this.character_repository.findOne({
      where: {
        character_id,
        user: {
          user_id,
        },
      },
      relations,
    });

    return character;
  };

  public get_characters = async ({
    user_id,
    relations,
  }: GetCharacters): Promise<Character[]> => {
    const characters = await this.character_repository.find({
      where: {
        user: {
          user_id,
        },
      },
      relations,
    });

    return characters;
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

  public create_character_attribute = async ({
    character_id,
    attribute_id,
    value,
  }: CreateCharacterAttribute): Promise<CharacterAttribute> => {
    const character_attribute = await this.character_attribute_repository.save({
      attribute: { attribute_id },
      character: { character_id },
      value,
    });

    return character_attribute;
  };

  public create_character_with_attributes = async ({
    class_attributes,
    class_id,
    name,
    user_id,
  }: CreateCharacterWithAttributes) => {
    return PostgresDataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const character = await transactionalEntityManager.save(Character, {
            class: { class_id },
            user: { user_id },
            name,
          });

          for (const class_attribute of class_attributes) {
            await transactionalEntityManager.save(CharacterAttribute, {
              character: { character_id: character.character_id },
              attribute: {
                attribute_id: class_attribute.attribute.attribute_id,
              },
              value: class_attribute.value,
            });
          }

          return character;
        } catch (error) {
          this.logger.error('Error creating character with attributes.');
          this.logger.error(error);

          throw error;
        }
      },
    );
  };

  public create_character_item_and_decrement_money = async ({
    character_id,
    item_id,
    value,
  }: CreateCharacterItem): Promise<CharacterItem> => {
    return PostgresDataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const character_item = await transactionalEntityManager.save(
            CharacterItem,
            {
              character: { character_id },
              item: { item_id },
            },
          );

          await transactionalEntityManager.decrement(
            Character,
            { character_id },
            'money',
            value,
          );

          return character_item;
        } catch (error) {
          this.logger.error('Error creating character item.');
          this.logger.error(error);

          throw error;
        }
      },
    );
  };
}
