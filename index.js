#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const CURR_DIR = process.cwd();

function writeTemplateToDirectory(templatePath) {
    
    console.log(`

Adding template files...

`);
    
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach((file, i) => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');
            
            // Rename
            if (file === '.npmignore') file = '.gitignore';

            const writePath = `${CURR_DIR}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
            
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${file}`);

            // recursive call
            writeTemplateToDirectory(`${templatePath}/${file}`);
        }
        
        // last file has been created/end of loop
        if (i === filesToCreate.length - 1) {
            
            // run "npm install"
            execSync("npm install",{stdio:[0,1,2]});
            
            // rename gitignore to .gitignore
            fs.rename(`${CURR_DIR}/gitignore`, `${CURR_DIR}/.gitignore`, function(err) {
                if ( err ) console.log('ERROR: ' + err);
                
                console.log('gitignore -> .gitignore');
            });

            // rename npmrc to .npmrc
            fs.rename(`${CURR_DIR}/npmrc`, `${CURR_DIR}/.npmrc`, function(err) {
                if ( err ) console.log('ERROR: ' + err);
                
                console.log('npmrc -> .npmrc');
            });
            
            console.log(`

TWK Boilerplate has successfully been installed, You are ready to go!         

--- start compiling with: npm run dev
--- compile for production (uglify & minify) with: npm run prod


            `);
        }
    });
}

writeTemplateToDirectory(`${__dirname}/template`);