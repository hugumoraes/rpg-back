/* ---------- External ---------- */
import { Request, Response } from 'express';

/* ---------- Common ---------- */
import { create_http_error } from '../../common/errors/http';
import { logger } from '../../common/utils/logs';

/* ---------- Repositories ---------- */
import { CharacterRepository } from '../../repositories/characters/characters.repository';
import { ItemRepository } from '../../repositories/items/items.repository';

export class StoreController {
  private logger = logger;
  private characters_repository = new CharacterRepository();
  private items_repository = new ItemRepository();

  /**
   * @description Purchase an item
   * @param request
   * @param response
   * @returns Repository<Item>
   */
  public purchase_an_item = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { character_id } = request.body;
    const { item_id, user_id } = request.params;

    this.logger.info('Purchasing an item...');
    this.logger.debug({
      character_id,
      item_id,
      user_id,
    });

    const character = await this.characters_repository.get_character_by_id({
      user_id: Number(user_id),
      character_id: Number(character_id),
      relations: ['character_items'],
    });

    if (!character) {
      this.logger.error('Character not found.');

      return create_http_error({
        code: 404,
        response,
      });
    }

    this.logger.info('Character found.');
    this.logger.debug(character);

    const item = await this.items_repository.get_item_by_id({
      item_id: Number(item_id),
    });

    if (!item) {
      this.logger.error('Item not found.');

      return create_http_error({
        code: 404,
        response,
      });
    }

    this.logger.info('Item found.');
    this.logger.debug(item);

    if (character.money < item.value) {
      this.logger.error('Not enough money.');

      return create_http_error({
        code: 400,
        response,
        message: 'Not enough money.',
      });
    }

    await this.characters_repository.create_character_item_and_decrement_money({
      character_id,
      item_id: item.item_id,
      value: item.value,
    });

    this.logger.info('Item purchased.');

    return response.status(200).json({});
  };
}
