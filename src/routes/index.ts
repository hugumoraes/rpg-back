/* ---------- External ---------- */
import { Router } from 'express';

/* ---------- Routes ---------- */
import { characters_routes } from './characters/characters.routes';
import { users_routes } from './users/users.routes';

const routes = Router();

routes.use(characters_routes);
routes.use(users_routes);

export { routes };
