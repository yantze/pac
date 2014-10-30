// Borrowing from : goagent 和 cow的pac配置文件
// author : yantze
// last change : 2014/10/31

var autoproxy_host = {
    'twitter.com': 1, //下面是twitter的服务
    'twimg.com': 1,
    't.co': 1,
    'youtube.com': 1,
    'instagram.com': 1, //下面是instagram服务
    'cdninstagram.com': 1,
    'feedly.com': 1,  //rss推送平台
    'hootsuite.com': 1,  //这是一个管理微博和twitter的平台
    'wordpress.com': 1
};
var blackhole_host = {
    '113.17.188.42': 1,
    'zvweapp.com': 1
};
var domain_host = {
    'ly': 1
};
//指定代理的网址和端口
/* var autoproxy = 'PROXY 127.0.0.1:7777'; //这个是使用cow二次代理软件，goagent不行的时候用 */
var autoproxy = 'PROXY 127.0.0.1:8087';
var blackhole = 'PROXY 127.0.0.1:8086';
function FindProxyForURL(url, host) {
    var defaultproxy = 'DIRECT';
    if (isPlainHostName(host) ||
        host.indexOf('127.') == 0 ||
        host.indexOf('192.168.') == 0 ||
        host.indexOf('10.') == 0 ||
        shExpMatch(host, 'localhost.*')) {
        return 'DIRECT';
    } else if (FindProxyForURLByAdblock(url, host) != defaultproxy ||
               host == 'p.tanx.com' ||
               dnsDomainIs(host, '.2mdn.net') ||
               dnsDomainIs(host, '.doubleclick.net')) {
        return blackhole;
    } else if (shExpMatch(host, '*.google*.*') ||
               dnsDomainIs(host, '.ggpht.com') ||
               dnsDomainIs(host, '.sf.net') ||
               /* host.indexOf('.ly/') ||  //这里有个功能是自己添加后缀，比如说ly网址后缀都是被墙掉的 */
               host == 'sourceforge.net' ||
               host == 'goo.gl') {
        return autoproxy;
    } else {
        return FindProxyForURLByAutoProxy(url, host);
    }
}

function FindProxyForURLByAdblock(url, host) {
    if (blackhole_host.hasOwnProperty(host)) {
        return blackhole;
        /* return 'no influence whatever you write'; */
    }
    return 'DIRECT';
}

function FindProxyForURLByAutoProxy(url, host) {
    var lastPos;
    do {
        if (autoproxy_host.hasOwnProperty(host)) {
            /* return 'PROXY 127.0.0.1:8087'; */
            return autoproxy;
        }
        lastPos = host.indexOf('.') + 1;
        host = host.slice(lastPos);
        domain_postfix = host;
        if (domain_host.hasOwnProperty(domain_postfix)) {
            return autoproxy;
        }
    } while (lastPos >= 1);
    return 'DIRECT';
}
