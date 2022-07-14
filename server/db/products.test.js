const knex = require('knex')
const config = require('./knexfile')
const env = 'test'
const testDb = knex(config[env])
const db = require('./products')

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getAllProducts', () => {
  test('returns all products', async () => {
    const products = await db.getAllProducts(testDb)
    expect(products).toHaveLength(4)
  })
})

describe('addProduct', () => {
  test('adds a product and returns the product id', async () => {
    const mockObject = {
      name: 'apple',
      open_date: '2022-07-14',
      expiry_date: '2022-07-16',
      is_used: 0,
      compartment: 'fridge',
      product_type_id: 3,
    }
    const [id] = await db.addProduct(mockObject, testDb)
    expect(id).toBe(5)
  })
})
