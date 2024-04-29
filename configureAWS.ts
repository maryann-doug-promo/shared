import AWS from 'aws-sdk';

// Set the region 
AWS.config.update({ region: 'us-east-1' }); // Replace with your AWS region

// Set the credentials
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ""
});

// Create an SES service object
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export default ses;
