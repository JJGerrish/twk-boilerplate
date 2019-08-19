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

# install dependencies
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

## Upload via FTP
This boilerplate will work locally by default. To automatically upload files via FTP, add the FTP details to the javascript object in twk-boilerplate.config.js. All details must be entered correctly for it to work.

```javascript
module.exports = {
    ftpDetails: {
        host: "HOST",
        port: 21,
        user: "USERNAME",
        pass: "PASSWORD",
        remotePath: "REMOTE PATH"
    }
};
```

## Update
```sh
npm update twk-boilerplate -g
```