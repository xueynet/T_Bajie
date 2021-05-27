const fs = require('fs-extra');
const gulp = require('gulp');
const ALY = require('aliyun-sdk');

const name = 'Bajie';

gulp.task("publish-zip", async function () {
  var ossStream = require('aliyun-oss-upload-stream')(new ALY.OSS({
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    secretAccessKey: process.env.OSS_SECRET_ACCESS_KEY,
    endpoint: 'http://oss-cn-beijing.aliyuncs.com',
    apiVersion: '2013-10-15'
  }));

  var upload = ossStream.upload({
    Bucket: process.env.OSS_BUCKET_DL,
    Key: `templates/T_${name}.zip`
  });
  
  upload.minPartSize(1048576);
  
  var read = fs.createReadStream(`./wwwroot/sitefiles/sitetemplates/T_${name}.zip`);
  read.pipe(upload);
});