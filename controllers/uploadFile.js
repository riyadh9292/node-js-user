import GoogleCloudStorage from '../utils/googleCloudStorage.js'

export const uploadFile = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' })
	}
	try {
		const uploadResult = await GoogleCloudStorage.upload(req.file)
		res
			.status(200)
			.json({ message: 'File uploaded successfully', url: uploadResult })
	} catch (error) {
		res.send({ success: false, message: error.message.replace(/"/g, '') })
	}
}
