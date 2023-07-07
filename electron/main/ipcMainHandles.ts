import fs from "node:fs";
import path from "node:path";
import { ipcMain, app } from "electron";
interface navItem {
  name: string;
}
// app.getPath("exe") 可以获取到打包后的可执行文件的路径, 位于MacOs下, 上一层即为根目录,  包内容下的contents/
// windows平台待验证
function getAppRootPath() {
  return app.isPackaged
    ? path.join(path.dirname(app.getPath("exe")), "../")
    : app.getAppPath();
}
ipcMain.handle("get-files", (e, msg) => {
  //   let files = app.isPackaged ? path.dirname(app.getPath('home')) : app.getAppPath();
  return `home: => ${getAppRootPath()}`;
});

ipcMain.handle("getNavList", (e, msg) => {
  let navList: navItem[] = [];
  let navJsonStr = fs.readFileSync(
    path.join(getAppRootPath(), "./config/nav.json")
  );
  try {
    navList = JSON.parse(navJsonStr);
  } catch (err) {}
  return navList;
});
