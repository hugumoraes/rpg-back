import 'reflect-metadata';

/* ---------- External ---------- */
import { DataSource } from 'typeorm';

/* ---------- Config ---------- */
import { db_host, db_name, db_password, db_port, db_user } from '../config';

/* ---------- Models ---------- */
import { Attribute } from '../../models/attribute/attribute.entity';
import { Character } from '../../models/character/character.entity';
import { CharacterAttribute } from '../../models/character-attribute/character-attribute.entity';
import { Class } from '../../models/class/class.entity';
import { ClassAttribute } from '../../models/class-attribute/class-attribute.entity';
import { User } from '../../models/user/user.entity';

/* ---------- Utils ---------- */
import { logger } from '../utils/logs';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_password,
  database: db_name,
  entities: [
    Attribute,
    Character,
    CharacterAttribute,
    Class,
    ClassAttribute,
    User,
  ],
  synchronize: false,
  logging: false,
});

PostgresDataSource.initialize()
  .then(() => {
    logger.debug('Entities: ');

    PostgresDataSource.entityMetadatas.forEach(entity => {
      logger.debug(`Entity: ${entity.name}`);
      logger.debug(`Table Name: ${entity.tableName}`);
      logger.debug('Relations:');
      entity.relations.forEach(relation => {
        logger.debug(
          ` - ${relation.propertyName} -> ${relation.inverseEntityMetadata.tableName}`,
        );
      });
      logger.debug('\n');
    });

    return logger.info('Data Source has been initialized!');
  })
  .catch(err => {
    logger.error(`Error during Data Source initialization: `);
    logger.error(err);
  });
