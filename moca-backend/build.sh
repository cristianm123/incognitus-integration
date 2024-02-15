echo "building moca-backend"

MYBUILDINGPATH="$(pwd)"

if [ -d "$MYBUILDINGPATH"/build ]; then rm -Rf "$MYBUILDINGPATH"/build; fi
mkdir "$MYBUILDINGPATH"/build
cd "$MYBUILDINGPATH"/build

COMMITSHA="$(git rev-parse --short HEAD)"

docker build --no-cache -f ../Dockerfile -t i2thub.icesi.edu.co:5000/moca:"$COMMITSHA" .

docker tag i2thub.icesi.edu.co:5000/moca:"$COMMITSHA" i2thub.icesi.edu.co:5000/moca:latest

echo "finished"