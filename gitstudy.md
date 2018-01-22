1. 安装并打开gitbash
```bash
git config --global user.name "13149260506@163.com"
git config --global user.email 13149260506@163.com
```
2. 切换到d盘：
```
cd /d
```
3. 在d盘创建本地版本库
```
mkdir gitstudy
cd gitstudy/
git init
```
4. 在gitstydy中创建一个readme.txt文件，添加并提交到本地仓库
```
git add readme.txt
git commit -m "wrote a readme file"
```
5. 注册githup账号并在githup上创建一个名为gitstudy的远程仓库，然后把本地内容推送到远程仓库。
```
 ssh-keygen -t rsa -C 13149260506@163.com
 git remote add origin https://github.com/liyuan-meng/gitStudy.git
 git push -u origin master
```
6. 以后提交
```
git push origin master
```
