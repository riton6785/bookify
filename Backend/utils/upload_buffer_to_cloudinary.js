const streamifier = require('streamifier');
const cloudinary = require('./cloudinary_config');

const uploadBufferToCloudinary = (async(buffer, publicId)=> {
    return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'invoices',
        public_id: publicId,
      },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
})

module.exports = {uploadBufferToCloudinary}
