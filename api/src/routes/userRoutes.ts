import express from 'express';
import { UserService } from '../services/UserService';
import { MongoDBDataService, PostgresDataService, InMemoryDataService} from '../data';
import { User } from '../models/User';
import { config } from '../config';

const router = express.Router();


// Choose MemoryData, MongoDB or Postgres implementation
// const userService = new UserService(new MongoDBDataService<User>(config.MONGO_URI, 'mydatabase', 'users'));
// const userService = new UserService(new PostgresDataService<User>(config.POSTGRESS_URI, 'users'));

const userService = new UserService(new InMemoryDataService<User>());

router.get('/', async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
  await userService.updateUser(req.params.id, req.body);
  res.status(204).send();
});

router.delete('/:id', async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});

export default router;
