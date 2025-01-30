/* ---------- External ---------- */

/* ---------- Types ---------- */
import {
  CreateCharacterAttribute,
  GetAttributeById,
  GetClassAttributesByClassId,
} from '../../types/attributes.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Attribute } from '../../models/attribute/attribute.entity';
import { ClassAttribute } from '../../models/class-attribute/class-attribute.entity';
import { CharacterAttribute } from '../../models/character-attribute/character-attribute.entity';

export class AttributeRepository {
  private readonly attribute_repository =
    PostgresDataSource.getRepository(Attribute);

  private readonly class_attribute_repository =
    PostgresDataSource.getRepository(ClassAttribute);

  private readonly character_attribute_repository =
    PostgresDataSource.getRepository(CharacterAttribute);

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

  public get_attribute_by_id = async ({
    attribute_id,
  }: GetAttributeById): Promise<Attribute | null> => {
    const attribute = await this.attribute_repository.findOne({
      where: { attribute_id },
    });

    return attribute;
  };

  public get_class_attributes_by_class_id = async ({
    class_id,
    relations,
  }: GetClassAttributesByClassId): Promise<ClassAttribute[]> => {
    const class_attributes = await this.class_attribute_repository.find({
      where: {
        class: { class_id },
      },
      relations,
    });

    return class_attributes;
  };
}
