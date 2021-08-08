// 因为npm run build 时候静态文件没有被打包进去，所以需要一个命令进行复制静态文件
import shellJs from "shelljs"

shellJs.cp('-R',"public","dist") // 把 public 文件夹复制到 dist 目录下
shellJs.cp('-R',"views","dist") // 把 views 文件夹复制到 dist 目录下
