const watch = require("node-watch"); // watches files for changes
const jsftp = require("jsftp"); // allows connection to server via FTP
const fs = require("fs"); // Node's "file system" - jsftp above is essentially a wrapper for this but we need it to read the file
const notifier = require("node-notifier"); // Used for desktop notifications
const { ftpDetails } = require("./twk-boilerplate.config");

const jsftpDetails = {
    host: ftpDetails.host,
    port: ftpDetails.port,
    user: ftpDetails.user,
    pass: ftpDetails.pass
};

const ftpUpload = ftpDetails.host ? true : false;

const ignoreNotifications = [
    "assets/css/screen.css.map",
    "assets/js/bundle.min.js.map"
];

if (ftpUpload) {
    watch("./", { recursive: true, filter: /^(?!.*[.](css|scss|css.map)$).*$/ }, (evt, name) => {
        let ftp = new jsftp(jsftpDetails); // need to create a new FTP connection for each file hence it being inside the watch function

        let remoteFilePath = ftpDetails.remotePath + "/" + name;

        fs.readFile(name, (readError, buffer) => {
            if (readError) {
                console.error("readError:", readError);
                notifier.notify({
                    title: "Error",
                    message: readError
                });
            } else {
                ftp.put(buffer, remoteFilePath, putError => {
                    if (putError) {
                        console.error("FTP", putError.toString());
                        notifier.notify({
                            title: "FTP Error",
                            message: "Cannot connect to the server. Please make sure the FTP Username and Password are correct."
                        });
                    } else {
                        console.log(name + " - uploaded successfuly");

                        if (!ignoreNotifications.includes(name)) {
                            notifier.notify({
                                title: "Success!",
                                message: "Successfully uploaded " + name
                            });
                        }

                        ftp.raw("quit", function(quitErr, data) {
                            if (quitErr) return console.error(quitErr);
                        });
                    }
                });
            }
        });
    });
}
