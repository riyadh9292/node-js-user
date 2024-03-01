import jwt from 'jsonwebtoken'

const authenticateJWT = (req, res, next) => {
	const token = req.headers['authorization']

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	console.log(token, 'token')

	jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
		console.log(err)
		if (err) {
			return res.status(403).json({ error: 'Forbidden' })
		}
		req.user = decoded
		next()
	})
}

export { authenticateJWT }
