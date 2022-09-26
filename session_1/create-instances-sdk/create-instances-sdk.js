// Import required AWS SDK clients and commands for Node.js
const  { EC2Client } = require( "@aws-sdk/client-ec2");
// Set the AWS Region.
const REGION = "ap-southeast-1"; //e.g. "us-east-1"
// Create anAmazon EC2 service client object.
const ec2Client = new EC2Client({ region: REGION });
module.exports = { ec2Client };


const {
  CreateTagsCommand,
  RunInstancesCommand,
} = require("@aws-sdk/client-ec2");
//import { ec2Client } from "./libs/ec2Client";

// Set the parameters
const instanceParams = {
  ImageId: "ami-07651f0c4c315a529", //AMI_ID
  InstanceType: "t2.micro",
  KeyName: "tailan.savethedate", //KEY_PAIR_NAME
  MinCount: 1,
  MaxCount: 1,
};

const run = async () => {
  try {
    const data = await ec2Client.send(new RunInstancesCommand(instanceParams));
    console.log(data.Instances[0].InstanceId);
    const instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: "Name",
          Value: "instances-sdk",
        },
      ],
    };
    try {
      await ec2Client.send(new CreateTagsCommand(tagParams));
      console.log("Instance tagged");
    } catch (err) {
      console.log("Error", err);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
run();
