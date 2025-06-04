#! /bin/sh

echo "VITE_BUILD_VERSION=$COMMIT_REF" > ./.env
echo "VITE_BUILD_DATE=$(date +%s)" >> ./.env
vite build
return 0
