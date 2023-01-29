import AWS from 'aws-sdk'

const s3 = new AWS.S3()

export const s3Storage = async (file) => {
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `/uploads/${file.originalname}`,
    Body: file.buffer,
    ContentType: 'multipart/form-data',
  }

  try {
    return await s3.putObject(param).promise()
  } catch (err) {
    console.log(err)
  }
}

export const getFileStream = (key) => {
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }
  return s3
    .getObject(param)
    .createReadStream()
    .on('error', (error) => {
      console.log(error)
    })
}
