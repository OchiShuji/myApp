cd /myApp/web
echo `pwd`

node ./app.js &

if [ $? -ne 0 ]; then
echo "error"
fi