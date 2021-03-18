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
# dev: watches files for changes, compiles SCSS and JS, and uploads all files
npm run dev

# prod: the same as dev but minifies the css & javascript and excludes source maps
npm run prod
```

## Upload via FTP & SFTP
This boilerplate will work locally by default. To automatically upload files via FTP or SFTP, add the FTP or SFTP details to the javascript object in twk-boilerplate.config.js. All details must be entered correctly for it to work.

```javascript
module.exports = {
    ftpDetails: {
        sftp: false,
        host: "HOST",
        port: 21,
        username: "USERNAME",
        password: "PASSWORD",
        remotePath: "REMOTE PATH"
    }
};
```

### Note
FTP/SFTP details should only be changed when no script is running. Changing them whilst a script is running means you will have to exit the script (`CTRL + C`) and restart it.

## Update
```sh
npm update twk-boilerplate -g
```

## .gitignore
This boilerplate automatically creates a .gitignore file containing the following:

```sh
node_modules/
```
### Note
Any existing .gitignore files in the directory will be replaced

## Bugs/Feature Requests
Please add any bugs you find along with any new features you want to [the page on Notion](https://www.notion.so/twkdevelopers/Bug-Tracker-82a0b5dbc5784406b34d78358602e733).

ask JJ for access to write if you don't have it.
