var env={
    //默认环境配置
    "default":{
        "baseUrl":"",
        "apiHost":"/"
    },
    //默认开发环境配置
    "dev":{
        "baseUrl":"/chartDemo/static/dist",
        "apiHost":"/chartDemo/service/"
    },
    //产品环境配置
    "prod":{
        "baseUrl":"/chartDemo/static/dist",
        "apiHost":"/chartDemo/service/"
    }
};
// source setup
fis.set('project.files', ['/favicon.ico','/index.html','/login.html','/components/**','/node_modules/**','/static/**', 'test/**']);//, './map.json'
// used to do node_modules lookup
fis.hook('npm');

// used to resolve dependencies and wrap your code with `define`.
fis.hook('commonjs');

function onPreprocess (content,file,options) {

    // 兼容node的全局变量
    var vars = {
        process: function () {
            return 'var process = require(\'process/browser\');';
        },
        global: function () {
            return 'var global = typeof global !== "undefined" ? global : '
                + 'typeof self !== "undefined" ? self : '
                + 'typeof window !== "undefined" ? window : {};'
                ;
        },
        Buffer: function () {
            return 'var Buffer = require("buffer").Buffer;';
        },
        'Buffer.isBuffer': function () {
            return 'Buffer.isBuffer = require("is-buffer");';
        }
    };

// 替换node的一些全局变量
    var replaceVars = {
        __filename: function (file, basedir) {
            var filename = '/' + path.relative(basedir, file);
            return JSON.stringify(filename);
        },
        __dirname: function (file, basedir) {
            var dir = path.dirname('/' + path.relative(basedir, file));
            return JSON.stringify(dir);
        }
    };

    var content = content;
    var pushContent = [];
    var rest = file.rest;
    var basedir = '/';

    if (!file.isJsLike || !file.isMod) {
        return;
    }

    Object.keys(vars).forEach(function (name) {
        if (RegExp('\\b' + name + '\\b').test(content) && !(file.fullname.indexOf(name.toLowerCase()) >= 0)) {
            pushContent.push(vars[name](rest, basedir))
        }
    });

    //Object.keys(replaceVars).forEach(function (name) {
    //  content = content.replace(name, replaceVars[name](rest, basedir));
    //});


    // disabled.forEach(function (modules) {
    //   var moduleName = getModuleNameFromId(file.id);
    //   if (moduleName === modules.module) {
    //     content = content.replace(new RegExp("require\\(\\s?['\"]" + modules.key.replace('.', '\\.') + "['\"]\\s?\\)", "g"), '{}');
    //   }
    // });

    content = pushContent.join('\n') + '\n' + content;

    return content;
}

//配置mock接口模拟
fis.match('/test/**', {
    release: '$0',
    isMod: false
});
fis.match('/test/server.conf', {
    release: '/config/server.conf'
});

// our module loader 
fis.match('/node_modules/fis-mod/mod.js', {
    wrap: false
});

fis.match('/static/lib/**', {
    wrap: false
});

// !!REQUIRED 
fis.match('/node_modules/**.js', {
    isMod: true,
    useSameNameRequire: true,
    parser:onPreprocess
    //release: '/dist/$0'
});

fis.match('/components/**.{js,jsx}', {
    isMod: true,
    useSameNameRequire: true
    //release: '/dist/$0'
});

fis.match('/**', {
    url: env["default"]["baseUrl"]+'$0'
});

fis.match('{*.jsx,*:jsx}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: true
    }),
    rExt: '.js'
});


fis.match('**.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
        sourceMap: true
    })
});

fis.match('static/lib/GLOBAL_config.js', {
    globalVars: {
        apiHost: env["default"]["apiHost"],
        baseUrl:env["default"]["baseUrl"]
    },
    parser: fis.plugin('global-vars')
});

fis.match('::package', {
    postpackager: [
        fis.plugin('loader')
    ]
});

//maven开发环境场景配置
fis.media('dev')
    .match('static/lib/GLOBAL_config.js', {
        globalVars: {
            apiHost: env["dev"]["apiHost"],
            baseUrl:env["dev"]["baseUrl"]
        },
        parser: fis.plugin('global-vars')
    })
    .match('/**', {
        url: env["dev"]["baseUrl"]+'$0'
    })
    .match('::package', {
        postpackager: [
            fis.plugin('loader')
        ]
        //spriter: fis.plugin('csssprites'),
        //postpackager: fis.plugin('loader', {
        //    allInOne: true
        //})
        // packager: fis.plugin('map', {
        //     useTrack: false
        // })
    });

//maven产品环境场景配置
fis.media('prod')
    .match('**.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
        //useHash: true
    })
    .match('**.{css,less}', {
        //useSprite: true,
        optimizer: fis.plugin('clean-css')
        //useHash: true
    })
    // png图片压缩
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('static/lib/GLOBAL_config.js', {
        globalVars: {
            apiHost: env["prod"]["apiHost"],
            baseUrl:env["prod"]["baseUrl"]
        },
        parser: fis.plugin('global-vars')
    })
    .match('/**', {
        url: env["prod"]["baseUrl"]+'$0'
    })
    .match('::package', {
        //postpackager: [
        //    fis.plugin('loader')
        //]
        //spriter: fis.plugin('csssprites'),
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
        // packager: fis.plugin('map', {
        //     useTrack: false
        // })
    });

//生产环境配置
// fis.media('prod')
//     .match('**.{js,jsx}', {
//         optimizer: fis.plugin('uglify-js'),
//         useHash: true
//     })
//     .match('**.{css,less}', {
//         optimizer: fis.plugin('clean-css'),
//         useHash: true
//     })
//     .match('/node_modules/**.(*)', {
//         packTo: '/pkg/nodeModules.$1'
//     })
//     .match('/node_modules/fis-mod/**', {
//         packTo: 'mod.js',
//         packOrder: -1
//     })
//     .match('/components/**.(*)', {
//         packTo: '/pkg/components.$1'
//     })
//     .match('/**', {
//         url: env["prod"]["baseUrl"]+'$0'
//     })
//     .match('static/lib/GLOBAL_config.js', {
//         globalVars: {
//             apiHost: env["prod"]["apiHost"],
//             baseUrl:env["prod"]["baseUrl"]
//         },
//         parser: fis.plugin('global-vars')
//     })
//     .match('::package', {
//         postpackager: [
//             fis.plugin('loader')
//         ]
//         // packager: fis.plugin('map', {
//         //     useTrack: false
//         // })
//     });