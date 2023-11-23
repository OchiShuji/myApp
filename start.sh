cd /myApp/web
echo `pwd`

LPATH="../log/"
ls $LPATH >> /dev/null 2>&1

if [ $? -ne 0]; then
mkdir $LPATH
fi

node ./app.js >> "../log/myApplog_`date`.log" 2>&1 &&

if [ $? -ne 0 ]; then
echo "error"
fi