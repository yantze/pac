// Borrowing from : goagent 和 cow的pac配置文件
// last change : 2014/10/31
// project : http://github.com/yantze/pacconf
// author : yantze
/*
   我给我的dns配置了一下
   210.39.0.34 //深圳大学的dns
   178.79.131.110 //v2ex的dns
*/

//指定代理的网址和端口
/* var autoproxy = 'PROXY 127.0.0.1:7777'; //这个是使用cow二次代理软件，goagent不行的时候用 */
/* var autoproxy = 'PROXY 127.0.0.1:8088'; */
var autoproxy = 'PROXY 127.0.0.1:8087';
var blackhole = 'PROXY 127.0.0.1:8086';


//指定要代理的网址
var autoproxy_host_custom = {
    'twitter.com': 1, //下面是twitter的服务
    'twimg.com': 1,
    't.co': 1,
    'youtube.com': 1,
    'youtu.be': 1,
    'instagram.com': 1, //下面是instagram服务
    'cdninstagram.com': 1,
    'feedly.com': 1,  //rss推送平台
    'hootsuite.com': 1,  //这是一个管理微博和twitter的平台
    'amazonaws.com': 1,
    'klip.me': 1,
    'quora.com': 1,
    'archive.org': 1,
    'blogspot.org': 1,
    'blogspot.com': 1,
    'slideshare.net': 1,
    'facebook.com': 1,
    'facebook.net': 1,
    'fb.me': 1,
    'vimeo.com': 1,
    'flickr.com': 1,
    'duckduckgo.com': 1,
    'gstatic.com': 1,
    'google-analytics.com': 1,
    'googleusercontent.com': 1,
    'googleapis.com': 1,
    'spotify.com': 1,
    'cloudfront.net': 1,
    'last.fm': 1,
    'ttost.com': 1, //听听原声
    'optimizely.com': 1,
    'nytimes.com': 1, //以下作为不必知的网址
    'plurk.com': 1,
    'dailymotion.com': 1,
    'dmcdn.net': 1,
    'tubemogul.com': 1,
    'liverail.com': 1,
    'visiblemeasures.com': 1,
    'engadget.com': 1,
    'pixnet.net': 1,
    'books.com.tw': 1,
    'dotspace.idv.tw': 1,
    'thepiratebay.org': 1,
    'wired.com': 1,
    'echofon.com': 1,
    'j.mp': 1,
    'w.org': 1,
    'typekit.net': 1,
    'businessweek.com': 1,
    'wordpress.com': 1
};

//指定要墙掉的网址
var blackhole_host_custom = {
    '113.17.188.42': 1,
    'grooveshark.com': 1,
    'zvweapp.com': 1
};

//指定域名后缀
var domain_host_custom = {
    'ly': 1
};

function FindProxyForURL(url, host) {
    var defaultproxy = 'DIRECT';
    /* return autoproxy; //这里可以设置成代理全局 */
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
               dnsDomainIs(host, '.sf.net') ||
               /* host.indexOf('.ly/') || */
               host == 'sourceforge.net' ||
               host == 'goo.gl') {
        return autoproxy;
    } else {
        return FindProxyForURLByAutoProxy(url, host);
    }
}

function FindProxyForURLByAdblock(url, host) {
    if (blackhole_host_custom.hasOwnProperty(host)) {
        return blackhole;
        /* return 'no influence whatever you write'; */
    }
    return 'DIRECT';
}

function FindProxyForURLByAutoProxy(url, host) {
    var lastPos;
    do {
        if (autoproxy_host_custom.hasOwnProperty(host)) {
            return autoproxy;
        }
        lastPos = host.indexOf('.') + 1;
        host = host.slice(lastPos);
        domain_postfix = host;
        if (domain_host_custom.hasOwnProperty(domain_postfix)) {
            return autoproxy;
        }
    } while (lastPos >= 1);
    return 'DIRECT';
}
