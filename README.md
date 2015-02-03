#pac:配置代理
=======

[cow](https://github.com/cyfdecyf/cow)本身是一个全平台的二次代理软件，能自动对“超时”的网页代理，比较智能，但是使用一段时间后，总是感觉访问网页有些慢。虽然也有自己指定自动代理列表，总感觉不够纯粹和通用。

##pac文件说明
直接编辑pac文件
```
autoproxy_host_custom 添加需要代理的网站地址
blackhole_host_custom 添加需要墙掉的网站地址
domain_host_custom    添加需要代理的域名后缀
autoproxy 代理服务器地址
blackhole 要墙掉的网站访问的地址，其实这个网址可以自由发挥，有意想不到的作用
host.indexOf('.ly/') 看到这行了吗？这个是可以添加网站域的,同domain_host_custom作用
```

##whiltelist.txt使用方法
这个文件是白名单，放需要访问国内的网站或者流量大的网站。
把whiltelist.txt中需要复制的部分放到mac的代理设置界面，有一个Bypass domains/ip的窗口，直接拷贝进去就可以了

