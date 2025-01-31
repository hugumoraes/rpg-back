/* ---------- External ---------- */
import { Router } from 'express';

/* ---------- Routes ---------- */
import { characters_routes } from './characters/characters.routes';
import { users_routes } from './users/users.routes';
import { store_routes } from './store/store.routes';
import { classes_routes } from './classes/classes.routes';

const routes = Router();

routes.use(characters_routes);
routes.use(users_routes);
routes.use(store_routes);
routes.use(classes_routes);

export { routes };
