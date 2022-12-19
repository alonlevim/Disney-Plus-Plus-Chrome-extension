version="$(cat public/manifest.json | grep \"version\" | sed 's/\"version\": \"//' | sed 's/\",//' | sed -e 's/^[[:space:]]*//')"

npm run build:all

# # create zip
zip -r -D "releases/$version.zip" dist/* --exclude \*.map\* --exclude \*.txt\*