/* ---------- External ---------- */

/* ---------- Types ---------- */
import { GetItemById } from '../../types/items.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Item } from '../../models/item/item.entity';

export class ItemRepository {
  private readonly item_repository = PostgresDataSource.getRepository(Item);

  public get_item_by_id = async ({
    item_id,
    relations,
  }: GetItemById): Promise<Item | null> => {
    const item = await this.item_repository.findOne({
      where: {
        item_id,
      },
      relations,
    });

    return item;
  };
}
