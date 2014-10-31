#PACconf:自定义配置代理
=======

goagent和其它的一些vpn代理都是自己写一个pac代理，但是在下面的情况下不符合要求：

- 频繁切换，有些网址不在列表：有时候pac代理列表里面没有自己想要的网址，导致要更换到其它方式的代理，甚至禁用代理
- 内容的安全性：在程序员看来，高度可控是最好的
- 不通用：不同的代理程序需要不同的pac配置


其实[cow](https://github.com/cyfdecyf/cow)本身是一个全平台的二级代理软件，能自动对“超时”的网页代理，比较智能，但是使用一段时间后，发现总是感觉访问网页有些慢。虽然也有自己指定自动代理列表，总感觉不够纯粹和通用。

但是这个配置可以和goagent、ss与cow结合使用。goagent3.2比较好用。

##手动指定要代理的网址
直接编辑proxy.pac文件
```
autoproxy_host_custom 添加需要代理的网站地址
blackhole_host_custom 添加需要墙掉的网站地址
domain_host_custom    添加需要代理的域名后缀
autoproxy 代理服务器地址
blackhole 要墙掉的网站访问的地址，其实这个网址可以自由发挥，有意想不到的作用
host.indexOf('.ly/') 看到这行了吗？这个是可以添加网站域的,同domain_host_custom作用
```

##使用方法

#### 使用ie做全局代理
>打开ie的因特网(internet options)选项，选择连接(connections),右下有一个局域网连接(lan settings),点击使用自动配置脚本(Use automatic configuration script)，添加你proxy.pac文件的路径(file://e:\program\misc\proxy.pac),点确定就可以了。

#### 使用浏览器代理
>可以使用switchsharp或者foxyproxy来添加一个简单的pac代理就行。

#### 快速编辑pac文件
>在系统目录创建一个快捷方式，添加路径：C:\Windows\gvim.bat e:\program\misc\proxy.pac，或者你喜欢的编辑器，然后按照上面讲的方法添加网址，命名为ep。以后直接按win+r可以快速打开文件编辑


##声明
本配置参考自goagent和cow的pac文档

[MIT LICENSE](https://github.com/yantze/pacconf/blob/master/LICENSE)
