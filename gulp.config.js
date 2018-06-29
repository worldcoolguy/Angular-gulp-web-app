module.exports = function() {
    var client = 'client',
        clientApp = './client/app'
        dist = 'dist',
        tmp = '.tmp',
        docs = 'documentation';
    var config = {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + '/index.html',
        alljs: [
            client + '/app/**/*.js',
            './*.js'
        ],
        assetsLazyLoad: [
            client + '/bower_components/ngmap/build/scripts/ng-map.min.js',
            client + '/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js'
        ],
        assetsToCopy: [
            client + '/bower_components/webfontloader/webfontloader.js',
            client + '/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
            client + '/app/**/*.html',
            client + '/assets/**/*',
            client + '/config/**/*',
            client + '/vendors/**/*',
            client + '/bower_components/font-awesome/css/*',
            client + '/bower_components/font-awesome/fonts/*',
            client + '/styles/loader.css',
            //client + '/styles/ui/images/*',
            client + '/favicon.ico'
        ],
        less: [],
        sass: [
            client + '/styles/**/*.scss'
        ],
        js: [
            clientApp + '/**/*.module.js',
            clientApp + '/**/*.js',
            '!' + clientApp + '/**/*.spec.js'
        ],
        docs: docs,
        docsJade: [
            docs + '/jade/index.jade',
            docs + '/jade/faqs.jade',
            docs + '/jade/layout.jade'
        ],
        allToClean: [
            tmp,
            '.DS_Store',
            '.sass-cache',
            'node_modules',
            '.git',
            client + '/bower_components',
            docs + '/jade',
            docs + '/layout.html',
            'readme.md'
        ]
    };

    return config;
};
