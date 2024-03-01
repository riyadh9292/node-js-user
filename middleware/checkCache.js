// import redis, { createClient } from 'redis'

// const client = redis.createClient({
// 	host: process.env.REDIS_HOST,
// 	port: process.env.REDIS_PORT
// })
// await client.connect()

// const checkCache = (req, res, next) => {
// 	const key = 'users' // Define the key used to retrieve data from the cache

// 	client.get(key, (err, data) => {
// 		if (err) {
// 			console.error(err)
// 			res.status(500).send(err)
// 			return
// 		}

// 		if (data !== null) {
// 			// Data found in cache
// 			console.log('Data found in cache')
// 			res.status(200).json(JSON.parse(data))
// 		} else {
// 			// Data not found in cache, proceed to next middleware
// 			console.log('Data not found in cache')
// 			next()
// 		}
// 	})
// }

// export { checkCache }
