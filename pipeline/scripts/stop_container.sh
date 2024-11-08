
echo "test-api is running, stop and delete 📛 ..."
sudo docker stop test-api || true
sudo docker rm -f test-api || true
# sudo docker stop mongo || true
# sudo docker rm -f mongo || true

echo "removes unused Docker images from your system 📛 ..."
sudo docker image prune --filter "dangling=true" -f || true

echo "removes unused Docker containers from your system 📛 ..."
sudo docker container prune -f || true
