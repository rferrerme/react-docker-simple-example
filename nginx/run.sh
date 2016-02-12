# Workaround for bug in Virtualbox that corrupts "bundle.js"
# http://quyennt.com/web-development/chrome-js-syntaxerror-unexpected-token-illegal-caused-by-vagrant-synced-folder/
sed -i "s/sendfile        on/sendfile        off/g" /etc/nginx/nginx.conf

# Start
nginx -g "daemon off;"