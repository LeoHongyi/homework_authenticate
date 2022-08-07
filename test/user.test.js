const request = require('supertest')
const bcrypt = require('bcryptjs')
const {app} = require('../app')

const testUser = {
  username: 'testUser',
  password: '111111',
};

const testAddRole = {
  roleName: 'test'
}
let testToken = ''
/**
 * create user
 */
describe('test createUser', () => {
  test('create user need to have username', async () => {

    const response = await request(app)
      .post('/api/users')
      .send({ password: testUser.password });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ "error": "NAME_IS_REQUIRED" });
  });

  test('create user need to have password', async () => {

    const response = await request(app)
      .post('/api/users')
      .send({ username: testUser.username });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ "error": "PASSWORD_IS_REQUIRED" });
  });

  test('create user successfully will get 201 status code', async () => {

    const response = await request(app)
      .post('/api/users')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ "message": "created user successfully" });
  });
})

describe('test add role to user', () => {
  test('add role successfully', async () => {

    const response = await request(app)
      .post(`/api/useraddrole`)
      .send({ username: testUser.username, roleName: testAddRole.roleName });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'add role successfully'});
  });
})

describe('test authenticate', () => {
  test('test authenticate successfully', async () => {

    const response = await request(app)
      .post(`/api/authenticate`)
      .send({ username: testUser.username, password: testUser.password });
    expect(response.status).toBe(200);
    testToken = response.body.token
  });
})


describe('test add Role', () => {
  test('create Role successfully will get 201 status code', async () => {

    const response = await request(app)
      .post('/api/roles')
      .send(testAddRole);

    expect(response.status).toBe(201);
  });
})


describe('test check Role', () => {
  test('check Role successfully will get 201 status code', async () => {

    const response = await request(app)
      .post('/api/roles/role')
      .send({ username: testUser.username, roleName: testAddRole.roleName})
      .set({ Authorization: `Bearer ${testToken}` })
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: `${testAddRole.roleName} belongs to ${testUser.username}`});
  });
})

describe('test all roles', () => {
  test('all Roles successfully get', async () => {

    const response = await request(app)
      .post('/api/roles/allroles')
      .send({ username: testUser.username})
      .set({ Authorization: `Bearer ${testToken}` })
    expect(response.status).toBe(200);
    expect(response.body.result.length).toBe(1)
  });
})

describe('test invalidate', () => {
  test('test invalidate successfully', async () => {

    const response = await request(app)
      .post(`/api/invalidate`)
      .send({ username: testUser.username })
      .set({ Authorization: `Bearer ${testToken}` })
    expect(response.status).toBe(200);
  });

  test('check Role fail after invalidate', async () => {

    const response = await request(app)
      .post('/api/roles/role')
      .send({ username: testUser.username, roleName: testAddRole.roleName})
      .set({ Authorization: `Bearer ${testToken}` })
    expect(response.status).toBe(401);
  });
})

describe('test deleteUser', () => {
  test('delete user', async () => {

    const response = await request(app)
      .delete(`/api/users/${testUser.username}`)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'delete user successfully' });
  });

})

describe('test deleteRole', () => {
  test('delete role', async () => {

    const response = await request(app)
      .delete(`/api/roles/${testAddRole.roleName}`)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'delete role successfully' });
  });

})

