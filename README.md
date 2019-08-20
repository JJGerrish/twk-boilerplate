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

# run the boilerplate command - npm packages will be automatically installed
create-twk-boilerplate

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

### Note
Currently, if you enter FTP details whilst a script is running (i.e. you have excecuted `npm run dev`), files will not be automatically uploaded until you exit the script (`CTRL + C`) and re-run the script again. This will be fixed in a future version.

## Update
```sh
npm update twk-boilerplate -g
```

## .gitignore
This boilerplate automatically creates a .gitignore file containing the following:

```sh
node_modules/
twk-boilerplate.config.js
```
### Note
Any existing .gitignore files in the directory will be replaced

## Bugs/Feature Requests
Please add any bugs you find along with any new features you want to [the page on Notion](https://www.notion.so/twkdevelopers/Bug-Tracker-82a0b5dbc5784406b34d78358602e733).

ask JJ for access to write if you don't have it.