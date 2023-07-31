import boto3

session = boto3.Session(profile_name='taipv')
ec2 = boto3.client('ec2')
ec2_resource = boto3.resource('ec2')
# image_id = 'ami-0df7a207adb9748c7'  # AMI ID of the image you want to use
# instance_type = 't2.micro'     # Instance type, e.g., t2.micro, t2.small, etc.



# # Launch the instance
# response = ec2.run_instances(
#     ImageId=image_id,
#     InstanceType=instance_type,
#     MinCount=1,
#     MaxCount=1
# )
# print("Instance ID:", response['Instances'][0]['InstanceId'])





instance_id = 'i-0a71bf8eb8bfc54d8'
# # Start the instance
instance = ec2_resource.Instance(instance_id)
response = instance.start()
print("Instance state after starting:", response['StartingInstances'][0]['CurrentState']['Name'])




# instance = ec2_resource.Instance(instance_id)
# response = instance.stop()