# wn-site-website
fis3 release dev -wLc -d ../dist

fis3 release prod -wLc -d ../dist

sudo fis3 release dev -wLc -d ../dist
sudo fis3 server clean
sudo fis3 server start -p 6060
