const watch = require("node-watch"); // watches files for changes
const fs = require("fs");
const jsftp = require("jsftp"); // allows connection to server via FTP
const sass = require("node-sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const CleanCSS = require("clean-css");
const notifier = require("node-notifier"); // Used for desktop notifications
const { ftpDetails } = require("./twk-boilerplate.config");

const jsftpDetails = {
    host: ftpDetails.host,
    port: ftpDetails.port,
    user: ftpDetails.user,
    pass: ftpDetails.pass
};

const ftpUpload = ftpDetails.host ? true : false;

console.log(".scss files are being watched...");

watch("./", { recursive: true, filter: /\.scss$/ }, (evt, name) => {
    console.log("--------------------------------------------------");
    console.log(name + " has changed");

    // Compile SASS to CSS
    sass.render(
        {
            file: "./assets/sass/screen.scss",
            outputStyle: "expanded",
            sourceMap: true,
            outFile: "./assets/css/screen.css"
        },
        function(err, result) {
            if (err) {
                console.log(err);
                notifier.notify({
                    title: "Failed to process " + name,
                    message: `${err.message} on line ${err.line}`
                });
            } else {
                console.log("screen.scss -> screen.css");

                // Write compiled CSS to file
                fs.writeFile("./assets/css/screen.css", result.css, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("compiled file written");

                        // Autoprefixer
                        fs.readFile("./assets/css/screen.css", (err, buffer) => {
                            postcss([autoprefixer])
                                .process(buffer, {
                                    from: "assets/css/screen.css",
                                    to: "assets/css/screen.css",
                                    map: {
                                        inline: false,
                                        prev: result.map.toString() // previous source map
                                    }
                                })
                                .then(result => {
                                    result.warnings().forEach(warn => {
                                        console.warn(warn.toString());
                                    });

                                    console.log("file autoprefixed");

                                    // Write Autoprefixed CSS to file
                                    fs.writeFile("./assets/css/screen.css", result.css, err => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("autoprefixed css file written");

                                            notifier.notify({
                                                title: "Success!",
                                                message: "Successfully processed " + name
                                            });

                                            // Upload autoprefixed file to the server
                                            if (ftpUpload) {
                                                let ftp = new jsftp(jsftpDetails); // need to create a new FTP connection for each file hence it being inside the watch function

                                                fs.readFile("./assets/css/screen.css", (err, buffer) => {
                                                    ftp.put(buffer, ftpDetails.remotePath + "/assets/css/screen.css", putError => {
                                                        if (putError) {
                                                            console.error("FTP", putError.toString());
                                                            notifier.notify({
                                                                title: "FTP Error",
                                                                message: "Cannot connect to the server. Please make sure the FTP Username and Password are correct."
                                                            });
                                                        } else {
                                                            console.log("assets/css/screen.css - uploaded successfuly");

                                                            notifier.notify({
                                                                title: "Success!",
                                                                message: "Successfully uploaded assets/css/screen.css"
                                                            });

                                                            ftp.raw("quit", function(quitErr, data) {
                                                                if (quitErr) return console.error(quitErr);
                                                            });
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                
                                    // Write Source Map to file
                                    fs.writeFile("./assets/css/screen.css.map", result.map, function(err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("map written");

                                            if (ftpUpload) {
                                                let ftp = new jsftp(jsftpDetails); // need to create a new FTP connection for each file hence it being inside the watch function
                                                
                                                fs.readFile("./assets/css/screen.css.map", (err, buffer) => {
                                                    ftp.put(buffer, ftpDetails.remotePath + "/assets/css/screen.css.map", putError => {
                                                        if (putError) {
                                                            console.error("FTP", putError.toString());
                                                            notifier.notify({
                                                                title: "FTP Error",
                                                                message:"Cannot connect to the server. Please make sure the FTP Username and Password are correct."
                                                            });
                                                        } else {
                                                            console.log("assets/css/screen.css.map - uploaded successfuly");

                                                            ftp.raw("quit", function(quitErr, data) {
                                                                if (quitErr) return console.error(quitErr);
                                                            });
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });

                                    // Minify CSS and write to .min.css file
//                                    new CleanCSS({level: 1, sourceMap: true, sourceMapInlineSources: true}).minify(result.css, function (error, output) {
//
//                                        if (error) {
//                                            console.log(error);
//                                        } else {
//
//                                            // Minfied CSS
//                                            fs.writeFile('./assets/css/screen.min.css', output.styles, err => {
//                                                if (err){
//                                                    console.log(err);
//                                                } else {
//                                                    console.log('minified css file written');
//                                                }
//                                            });
//
//                                            // Minified Source Map
//                                            fs.writeFile('./assets/css/screen.min.css.map', output.sourceMap, err => {
//                                                if (err){
//                                                    console.log(err);
//                                                } else {
//                                                    console.log('minified css map file written');
//                                                }
//                                            });
//                                        }
//                                    });
                                })
                            // catch postcss promise error
                            .catch(err => {
                                console.log(err);
                            })
                        });
                    }
                });
            }
        }
    );
});