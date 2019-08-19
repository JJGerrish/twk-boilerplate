# twk-boilerplate
Front-end boilerplate for projects by The Web Kitchen.

## Installation
Installs a global version of the npm package so you can use it anywhere
```sh
npm install twk-boilerplate -g
```

## Usage
```sh
# navigate to the directory you want to install the boilerplate in, e.g:
cd /Applications/MAMP/htdocs/<project-name>/wp-content/themes/<theme-name>

# run the boilerplate
create-twk-boilerplate

# install dependancies
npm install

# run a script to start compiling
npm run dev
```

## Scripts
```sh
# dev: watches files for changes, compiles SCSS and JS
npm run dev

# prod: the same as dev but uglifies the javascript and excludes source maps
npm run prod
```