/* ---------- External ---------- */

/* ---------- Types ---------- */
import {
  GetAttributeById,
  GetClassAttributesByClassId,
} from '../../types/attributes.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Attribute } from '../../models/attribute/attribute.entity';
import { ClassAttribute } from '../../models/class-attribute/class-attribute.entity';

export class AttributeRepository {
  private readonly attribute_repository =
    PostgresDataSource.getRepository(Attribute);

  private readonly class_attribute_repository =
    PostgresDataSource.getRepository(ClassAttribute);

  public get_attributes = async (): Promise<Attribute[]> => {
    const attributes = await this.attribute_repository.find({});

    return attributes;
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
