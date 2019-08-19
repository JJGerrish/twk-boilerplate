#!/usr/bin/env node

const fs = require('fs');

// - get the current directory that "create-twk-boilerplate" was excecuted in
// - recursively copy the files from /template into the directory found above

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

            const writePath = `${CURR_DIR}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${file}`);

            // recursive call
            writeTemplateToDirectory(`${templatePath}/${file}`);
        }
        
        if (i === filesToCreate.length - 1) {
            
            console.log(`


All files have been added, You are ready to go!
                
start compiling with: npm run dev
compile for production (minify) with: npm run prod


            `);
        }
    });
}

writeTemplateToDirectory(`${__dirname}/template`);