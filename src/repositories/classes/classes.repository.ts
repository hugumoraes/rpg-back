/* ---------- External ---------- */

/* ---------- Types ---------- */
import { GetClasses } from '../../types/classes.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';
import { logger } from '../../common/utils/logs';

/* ---------- Models ---------- */
import { Class } from '../../models/class/class.entity';

export class ClassesRepository {
  private readonly logger = logger;

  private class_repository = PostgresDataSource.getRepository(Class);

  public get_classes = async ({ relations }: GetClasses): Promise<Class[]> => {
    const classes = await this.class_repository.find({
      relations,
    });

    return classes;
  };
}
