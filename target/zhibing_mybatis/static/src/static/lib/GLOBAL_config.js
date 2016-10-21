var protocol = window.location.protocol + '//',
    host = window.location.host,
    //ajaxMethod='{{ajaxMethod}}',
    apiHost='{{apiHost}}',
    //jsonp='{{jsonp}}',
    baseUrl = protocol + host +'{{baseUrl}}';

window.baseUrl = baseUrl;
window.apiHost = apiHost;

window.didInitJsUrl='{{didInitJsUrl}}';
window.didRequestUrl='{{didRequestUrl}}';
window.syncTimeUrl='{{syncTimeUrl}}';
window.userBindUrl='{{userBindUrl}}';
window.websocketUrl='{{websocketUrl}}';

window.systemNo='{{systemNo}}';
window.appId='{{appId}}';
window.appKey='{{appKey}}';
//window.ajaxMethod = ajaxMethod;
//window.jsonp = jsonp;