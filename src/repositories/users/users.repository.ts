/* ---------- External ---------- */

/* ---------- Types ---------- */
import { CreateUser, GetUserByEmail } from '../../types/users.types';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { User } from '../../models/user/user.entity';

export class UserRepository {
  private readonly user_repository = PostgresDataSource.getRepository(User);

  public get_user_by_id = async (id: number): Promise<User | null> => {
    const user = await this.user_repository.findOne({
      where: {
        user_id: id,
      },
    });

    return user;
  };

  public get_user_by_email = async ({
    email,
  }: GetUserByEmail): Promise<User | null> => {
    const user = await this.user_repository.findOne({
      where: {
        email,
      },
    });

    return user;
  };

  public create_user = async ({
    email,
    first_name,
    last_name,
    password,
  }: CreateUser): Promise<User | null> => {
    const user = await this.user_repository.save({
      email,
      first_name,
      last_name,
      password,
    });

    return user;
  };
}
