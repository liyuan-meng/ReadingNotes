#### 一、本地版本管理
1. 安装并打开gitbash
```
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
#### 二、远程版本管理
1. 注册githup账号并在githup上创建一个名为gitstudy的远程仓库，然后把本地内容推送到远程仓库。
```
 ssh-keygen -t rsa -C 13149260506@163.com
 git remote add origin https://github.com/liyuan-meng/gitStudy.git
 git push -u origin master
```
2. 以后提交
```
git push origin master
```
3. 在githup上创建一个仓库gitskills并勾选Initialize this repository with a README
4. 使用git克隆一个本地库
```
git clone https://github.com/liyuan-meng/gitskills.git
```
#### 三、分支管理
1. 创建dev分支并切换到dev分支
```
git branch dev
git checkout dev
```
2. 查看当前分支
```
git branch 
```
3. 切换到master分支
```
git checkout master
```
4. 将dev分支合并到master分支
```
git merge dev
```
5. 删除dev分支
```
git branch -d dev
```

