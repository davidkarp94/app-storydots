const S3 = require('aws-sdk/clients/s3');
const env = require('dotenv');
const fs = require('fs');
env.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    correctClockSkew: true
})

//upload

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile;