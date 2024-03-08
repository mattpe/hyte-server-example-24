import {listAllUsers} from '../src/models/user-model.mjs';

test('Get all users', async () => {
  const data = await listAllUsers();
  expect(data).toBe('peanut butter');
});
