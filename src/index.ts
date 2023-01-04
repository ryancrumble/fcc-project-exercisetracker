import App from './app.js';
import IndexRoutes from './routes/index.routes.js';
import UsersRoutes from './routes/users.routes.js';

const app = new App([new IndexRoutes(), new UsersRoutes()]);

app.listen();
