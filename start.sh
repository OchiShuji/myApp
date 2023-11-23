cd /myApp/web
echo `pwd`
node ./app.js >> "/var/log/myApplog_`date`.log" 2>&1

if [ $? -ne 0 ]; then
echo "error"
fi