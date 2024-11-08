echo "Login to AWS ECR 🔒..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 918000663876.dkr.ecr.us-east-1.amazonaws.com
echo "Pull API Image 🐳 ..."
# sudo docker pull mongo
sudo docker pull 18000663876.dkr.ecr.us-east-1.amazonaws.com/test-repo:latest
#stop and remove the current container
# sudo docker rm -f mongo
sudo docker rm -f test-api
echo "Run API Docker Image 🚀 ..."
# sudo docker run --name mongo --network node-mongo -d -p 27017:27017 mongo
sudo docker run --name test-api --network node-mongo -d -p 80:3001 18000663876.dkr.ecr.us-east-1.amazonaws.com/test-repo
