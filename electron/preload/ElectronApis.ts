import { ipcRenderer } from "electron";
interface navItem {
  name: string;
}
export async function demo() {
  console.log("運行demo");
  let files = await ipcRenderer.invoke("get-files");
  return files;
}

export async function getNavList(): Promise<navItem[]> {
  console.log("== 获取导航栏 ==");
  let navList = await ipcRenderer.invoke("getNavList");
  return navList;
}
