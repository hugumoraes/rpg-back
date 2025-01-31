/* ---------- External ---------- */
import { Request, Response } from 'express';

/* ---------- Common ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Repositories ---------- */
import { ClassesRepository } from '../../repositories/classes/classes.repository';

export class ClassesController {
  private logger = logger;
  private classes_repository = new ClassesRepository();

  /**
   * @description Get all classes
   * @param request
   * @param response
   * @returns Repository<Class[]>
   */
  public get_classes = async (
    _: Request,
    response: Response,
  ): Promise<Response> => {
    this.logger.info('Getting all classes...');

    const classes = await this.classes_repository.get_classes({
      relations: ['class_attributes', 'class_attributes.attribute'],
    });

    this.logger.info('Classes found.');
    this.logger.debug(classes);

    return response.status(200).json(classes);
  };
}
