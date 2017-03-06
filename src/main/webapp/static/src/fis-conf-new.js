var env={
    //默认开发环境配置
    "dev":{
        "env":"dev",
        "baseUrl":"",
        "apiHost":"/",
        "websocketUrl":"ws://192.168.82.44:8080/websocket/v2/websocket",
        "ssoLoginUrl":"http://192.168.109.67:8080/together"
    },
    //默认maven开发环境配置
    "dev-maven":{
        "env":"dev",
        "baseUrl":"/manage/dev",
        "apiHost":"/manage/",

        "systemNo":"30fe6c857cd040b2bb1ad629dbcc1c27",
        "appId":"119161",
        "appKey":"e6f74453275475d9827abc5b54c5f83f",

        "websocketUrl":"ws://192.168.82.44:8080/websocket/v2/websocket",

        "didInitJsUrl":"http://192.168.109.236:8080/did/js/dp.js",
        "didRequestUrl":"http://192.168.109.236:8080/did/rest/device/devicePrintId",

        "syncTimeUrl":"http://192.168.109.238:8081/tscserver/rest/client/synctimeForWeb",
        "userBindUrl":"http://192.168.109.238:8081/tscserver/rest/authority/userbindForWeb",

        "ssoLoginUrl":"http://192.168.109.67:8080/together"
    },
    //默认maven产品环境配置
    "dev-prod-maven":{
        "env":"qa",
        "baseUrl":"/manage/dist",
        "apiHost":"/manage/",

        "systemNo":"30fe6c857cd040b2bb1ad629dbcc1c27",
        "appId":"119161",
        "appKey":"e6f74453275475d9827abc5b54c5f83f",

        "websocketUrl":"ws://192.168.109.237:8080/tscsecurid_websocket/v2/websocket",

        "didInitJsUrl":"http://192.168.109.236:8080/did/js/dp.js",
        "didRequestUrl":"http://192.168.109.236:8080/did/rest/device/devicePrintId",

        "syncTimeUrl":"http://192.168.109.238:8081/tscserver/rest/client/synctimeForWeb",
        "userBindUrl":"http://192.168.109.238:8081/tscserver/rest/authority/userbindForWeb",

        "ssoLoginUrl":"http://192.168.109.67:8080/together"
    },
    //默认maven产品环境配置
    "prod-maven":{
        "env":"prod",
        "baseUrl":"/manage/dist",
        "apiHost":"/manage/",

        "systemNo":"3d737f4edca94d8a93f0104cfb3292a1",
        "appId":"18955",
        "appKey":"d4773505a06a28947020454cfbe62ec8",

        "websocketUrl":"wss://ba.tongfudun.com/websocket/v2/websocket",

        "didInitJsUrl":"https://pws.payegis.com.cn/did/js/dp.js",
        "didRequestUrl":"https://pws.payegis.com.cn/did/rest/device/devicePrintId",

        "syncTimeUrl":"https://ba.tongfudun.com/tsc/rest/client/synctimeForWeb",//https://ba.tongfudun.com/tsc/rest/client/synctimeForWeb
        "userBindUrl":"https://ba.tongfudun.com/tsc/rest/authority/userbindForWeb",//https://ba.tongfudun.com/tsc/rest/authority/userbindForWeb

        "ssoLoginUrl":"https://portal.tongfudun.com"
    }
};
// source setup
fis.set('project.files', ['/favicon.ico','/index.html','/slogin.html','/components/**','/node_modules/**','/static/**', 'test/**']);//, './map.json'
// used to do node_modules lookup
fis.hook('node_modules');

// used to resolve dependencies and wrap your code with `define`.
fis.hook('commonjs');

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
    parser: fis.plugin('node-env')
    //release: '/dist/$0'
});

// vue组件本身配置
fis.match('/components/**.vue', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: fis.plugin('vue-component', {
        cssScopeFlag: 'vuec'
    })
});

// vue组件中js片段处理。
fis.match('/components/**.vue:js', {
    parser: [
        fis.plugin('babel-5.x', {
            sourceMaps: true
        }),
        fis.plugin('translate-es3ify', null, 'append')
    ]
});

// vue组件中的less片段处理
fis.match('/components/**.vue:less', {
    rExt: 'css',
    parser: fis.plugin('less-2.x'),
    release: 'xxx' // 这个无效
});

// vue组件中的sass片段处理
// fis.match('src/vue/**.vue:scss', {
//   rExt: 'css',
//   parser: fis.plugin('node-sass')
// });

// vue组件中的jade模板片段处理
// fis.match('src/**.vue:jade', {
//   rExt: 'css',
//   parser: fis.plugin('jade')
// });

fis.match('/components/**.{js,jsx}', {
    isMod: true,
    useSameNameRequire: true
    //release: '/dist/$0'
});

fis.match('/**', {
    url: env["dev"]["baseUrl"]+'$0'
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
        apiHost: env["dev"]["apiHost"],
        baseUrl:env["dev"]["baseUrl"],
        websocketUrl:env["dev"]["websocketUrl"],
        ssoLoginUrl:env["dev"]["ssoLoginUrl"]
    },
    parser: fis.plugin('global-vars')
});

fis.match('::package', {
    postpackager: [
        fis.plugin('loader')
    ]
});

//maven开发环境场景配置
fis.media('dev-maven')
    .match('static/lib/GLOBAL_config.js', {
        globalVars: {
            apiHost: env["dev-maven"]["apiHost"],
            baseUrl:env["dev-maven"]["baseUrl"],

            env:env["dev-maven"]["env"],
            systemNo:env["dev-maven"]["systemNo"],
            appId:env["dev-maven"]["appId"],
            appKey:env["dev-maven"]["appKey"],

            didInitJsUrl:env["dev-maven"]["didInitJsUrl"],
            didRequestUrl:env["dev-maven"]["didRequestUrl"],

            syncTimeUrl:env["dev-maven"]["syncTimeUrl"],
            userBindUrl:env["dev-maven"]["userBindUrl"],

            websocketUrl:env["dev-maven"]["websocketUrl"],
            ssoLoginUrl:env["dev-maven"]["ssoLoginUrl"]
        },
        parser: fis.plugin('global-vars')
    })
    .match('/**', {
        url: env["dev-maven"]["baseUrl"]+'$0'
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
//maven开发产品环境场景配置
fis.media('dev-prod-maven')
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
            apiHost: env["dev-prod-maven"]["apiHost"],
            baseUrl:env["dev-prod-maven"]["baseUrl"],

            env:env["dev-prod-maven"]["env"],
            systemNo:env["dev-prod-maven"]["systemNo"],
            appId:env["dev-prod-maven"]["appId"],
            appKey:env["dev-prod-maven"]["appKey"],

            didInitJsUrl:env["dev-prod-maven"]["didInitJsUrl"],
            didRequestUrl:env["dev-prod-maven"]["didRequestUrl"],

            syncTimeUrl:env["dev-prod-maven"]["syncTimeUrl"],
            userBindUrl:env["dev-prod-maven"]["userBindUrl"],

            websocketUrl:env["dev-prod-maven"]["websocketUrl"],
            ssoLoginUrl:env["dev-prod-maven"]["ssoLoginUrl"]
        },
        parser: fis.plugin('global-vars')
    })
    .match('/**', {
        url: env["dev-prod-maven"]["baseUrl"]+'$0'
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
//maven产品环境场景配置
fis.media('prod-maven')
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
            apiHost: env["prod-maven"]["apiHost"],
            baseUrl:env["prod-maven"]["baseUrl"],

            env:env["prod-maven"]["env"],
            systemNo:env["prod-maven"]["systemNo"],
            appId:env["prod-maven"]["appId"],
            appKey:env["prod-maven"]["appKey"],

            didInitJsUrl:env["prod-maven"]["didInitJsUrl"],
            didRequestUrl:env["prod-maven"]["didRequestUrl"],

            syncTimeUrl:env["prod-maven"]["syncTimeUrl"],
            userBindUrl:env["prod-maven"]["userBindUrl"],

            websocketUrl:env["prod-maven"]["websocketUrl"],
            ssoLoginUrl:env["prod-maven"]["ssoLoginUrl"]
        },
        parser: fis.plugin('global-vars')
    })
    .match('/**', {
        url: env["prod-maven"]["baseUrl"]+'$0'
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
