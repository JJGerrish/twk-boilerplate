const path = require('path');
const fs = require('fs');
const watch = require("node-watch"); // watches files for changes
const notifier = require("node-notifier"); // Used for desktop notifications
const { ftpDetails: details } = require("./twk-boilerplate.config");
const ftpClient = require("basic-ftp");
const sftpClient = require("ssh2-sftp-client");



async function uploadFile(fileName, localFile, remoteFile, remoteDirectoryPath, sftp) {

    const type = sftp ? 'SFTP' : 'FTP';

    try {

        const client = sftp ? new sftpClient() : new ftpClient.Client();
        
        if (sftp) {

            const connected = await client.connect({
                host: details.host,
                port: details.port,
                username: details.username,
                password: details.password
            });
            const remoteDirectoryPathExists = await client.exists(remoteDirectoryPath);
            
            // recursively make the directories in the file path if they don't exist on the server
            if (!remoteDirectoryPathExists) {
                const makeRemoteDirectories = await client.mkdir(remoteDirectoryPath, true);
            }
            
            const fileUpload = await client.put(localFile, remoteFile);
            
            console.log(fileName + " - uploaded successfuly via SFTP");

            if (!fileName.includes('.map')) {
                notifier.notify({
                    title: "Success!",
                    message: "Successfully uploaded " + fileName
                });
            }
            
            const connectionEnded = await client.end();

        } else {
            
            const connected = await client.access({
                host: details.host,
                port: details.port,
                user: details.username,
                password: details.password,
                secure: false
            });
            const remotePathDirectoriesExist = await client.ensureDir(remoteDirectoryPath);
            const fileUpload = await client.uploadFrom(localFile, remoteFile);

            console.log(fileName + " - uploaded successfuly via FTP");

            if (!fileName.includes('.map')) {
                notifier.notify({
                    title: "Success!",
                    message: "Successfully uploaded " + fileName
                });
            }
            
            const connectionEnded = await client.close();
        }

    } catch (error) {
        console.log(`${type} Error`, error.message);
        notifier.notify({
            title: `${type} Error`,
            message: error.message
        });
    }
}

if (details.host) {
    watch("./", { recursive: true, filter: /^(?!.*[.](scss|DS_Store|git)$).*$/ }, (evt, fileName) => {

        const localFile = `${__dirname}/${fileName}`;
        const remoteFile = `${details.remotePath}/${fileName}`;
        const remoteDirectoryPath = path.dirname(remoteFile);

        // do nothing if the local file doesn't exist (it's been deleted) or it's a node_modules file or it's a .git file
        if (fs.existsSync(localFile) && !localFile.includes('node_modules') && !localFile.includes('.git')) {

            // return if localPath is a directory instead of a file
            if (fs.lstatSync(localFile).isDirectory()) return;

            uploadFile(fileName, localFile, remoteFile, remoteDirectoryPath, details.sftp);
        }
    });
}