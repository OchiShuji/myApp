cd /myApp/web
echo `pwd`

forever start -w ./app.js &

if [ $? -ne 0 ]; then
echo "error"
fi