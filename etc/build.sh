rimraf dist

tsc --project tsconfig.json && tscpaths -p tsconfig.json -s ./ -o ./dist

rm dist/jest.config.js dist/tsconfig.json

cp package.json .env dist/
