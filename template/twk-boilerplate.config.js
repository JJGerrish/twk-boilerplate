const jsPath= './assets/js';
const scssPath = './assets/sass';

module.exports = {
    ftpDetails: {
        sftp: false,
        host: "",
        port: 21,
        username: "",
        password: "",
        remotePath: ""
    },
    // name of output file on the left, path to input file on the right
    entryPoints: {
        'bundle': jsPath + '/script.js',
        'screen': scssPath + '/screen.scss',
        'editor-style': scssPath + '/editor-style.scss',
    }
};
