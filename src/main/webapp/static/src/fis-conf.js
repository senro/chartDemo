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
fis.hook('node_modules');

// used to resolve dependencies and wrap your code with `define`.
fis.hook('commonjs');

//fis.on('process:start', onPreprocess);

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

fis.match('/static/**', {
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
})

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

fis.match('static/js/GLOBAL_config.js', {
    globalVars: {
        //env:env["dev"]["env"],
        apiHost: env["default"]["apiHost"],
        baseUrl:env["default"]["baseUrl"]
    },
    parser: fis.plugin('global-vars')
});

fis.match('/**', {
    url: env["default"]["baseUrl"]+'$0'
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
