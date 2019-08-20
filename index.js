#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const CURR_DIR = process.cwd();

function writeTemplateToDirectory(templatePath) {
    
    console.log('Adding files...');
    
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
        
        if (i === filesToCreate.length - 1) {
            
            // run "npm install"
            execSync("npm install",{stdio:[0,1,2]});
            
            console.log(`

TWK Boilerplate has successfully been installed, You are ready to go!         

--- start compiling with: npm run dev
--- compile for production (uglify & minify) with: npm run prod


            `);
        }
    });
}

writeTemplateToDirectory(`${__dirname}/template`);