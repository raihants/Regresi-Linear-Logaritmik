docker build -t regression-api .   

docker run -d -p 8000:8000 --name regression-container regression-api

