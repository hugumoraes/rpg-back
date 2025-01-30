/* ---------- External ---------- */
import { Request, Response } from 'express';

/* ---------- Common ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Repositories ---------- */
import { AttributeRepository } from '../../repositories/attributes/attributes.repository';
import { CharacterRepository } from '../../repositories/characters/characters.repository';

export class CharactersController {
  private logger = logger;
  private attributes_repository = new AttributeRepository();
  private characters_repository = new CharacterRepository();

  /**
   * @description Get a character by id
   * @param request
   * @param response
   * @returns Repository<Character>
   */
  public get_character_by_id = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { character_id, user_id } = request.params;

    this.logger.info('Getting a character...');
    this.logger.debug({
      character_id,
      user_id,
    });

    const character = await this.characters_repository.get_character_by_id({
      character_id: Number(character_id),
    });

    this.logger.info('Character found.');
    this.logger.debug(character);

    return response.status(200).json({
      character,
    });
  };

  /**
   * @description Create a new character
   * @param request
   * @param response
   * @returns Repository<Character>
   */
  public create_character = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { user_id, class_id, name } = request.body;

    this.logger.info('Creating a character...');
    this.logger.debug({
      class_id,
      name,
      user_id,
    });

    const character = await this.characters_repository.create_character({
      class_id,
      user_id,
      name,
    });

    if (!character) {
      this.logger.info('Error creating character.');
      this.logger.debug(character);

      return response.status(400).json({
        message: 'Error creating character',
      });
    }

    this.logger.info('Character created.');
    this.logger.debug(character);

    this.logger.info('Getting class attributes...');

    const class_attributes =
      await this.attributes_repository.get_class_attributes_by_class_id({
        class_id,
        relations: ['attribute'],
      });

    this.logger.info('Class attributes found.');
    this.logger.debug(class_attributes);

    for (const class_attribute of class_attributes) {
      this.logger.info('Creating character attribute...');
      this.logger.debug(class_attribute);

      await this.attributes_repository.create_character_attribute({
        attribute_id: class_attribute.attribute.attribute_id,
        character_id: character.character_id,
        value: class_attribute.default_value,
      });
    }

    this.logger.info('Character attributes created.');

    return response.status(200).json({
      ...character,
    });
  };
}
