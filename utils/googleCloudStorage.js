import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'
import { readFileSync } from 'fs'

const storage = new Storage({
	projectId: process.env.GCLOUD_PROJECT,
	credentials: {
		type: process.env.GCS_TYPE,
		project_id: process.env.GCS_PROJECT_ID,
		private_key_id: process.env.GCS_PRIVATE_KEY_ID,
		private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n').replace(
			/"+/g,
			''
		),
		client_email: process.env.GCS_CLIENT_EMAIL,
		client_id: process.env.GCS_CLIENT_ID,
		auth_uri: process.env.GCS_AUTH_URI,
		token_uri: process.env.GCS_TOKEN_URI,
		auth_provider_x509_cert_url: process.env.GCS_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.GCS_CLIENT_X509_CERT_URL
	}
})

const bucket = storage.bucket(process.env.GCS_BUCKET)

class GoogleCloudStorage {
	async upload(file) {
		const fileName = file.originalname.replace(/ /g, '-')
		const newFileName = `${uuidv4()}-${fileName}`
		const doc = bucket.file(`my-manager/${newFileName}`)
		const blogStream = doc.createWriteStream({ resumable: false })

		await this.configureBucketCors()

		return new Promise((resolve, reject) => {
			blogStream.on('error', (err) => reject(err))
			blogStream.on('finish', () => {
				const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`
				resolve(publicUrl)
			})
			blogStream.end(file.buffer)
		})
	}

	async uploadBlob(filePath, fileName) {
		const newFileName = `${uuidv4()}-${fileName}`
		const doc = bucket.file(`my-manager/${newFileName}`)
		const fileBuffer = readFileSync(filePath)
		await doc.save(fileBuffer)

		await this.configureBucketCors()

		return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`
	}

	async uploadBuffer(buffer, fileName, fileType) {
		const newFileName = `${uuidv4()}-${fileName}`
		const doc = bucket.file(`my-manager/${newFileName}`)
		const stream = doc.createWriteStream({
			metadata: {
				contentType: fileType // Set the content type if you know it
			}
		})

		await this.configureBucketCors()

		return new Promise((resolve, reject) => {
			stream.on('error', (err) => reject(err))
			stream.on('finish', () => {
				const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`
				resolve(publicUrl)
			})
			stream.end(buffer)
		})
	}

	async delete(fileName) {
		if (await bucket.file(fileName).exists()) {
			await bucket.file(fileName).delete()
		}
	}

	async configureBucketCors() {
		await bucket.setCorsConfiguration([
			{
				method: ['GET', 'POST', 'HEAD'],
				origin: ['*'],
				responseHeader: ['*']
			}
		])
	}
}

export default new GoogleCloudStorage()
