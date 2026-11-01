# 人生重启计划 · 手机版（上传到 GitHub 用）

这个文件夹里就是手机版的全部文件。上传到 GitHub 以后，手机用 Safari 打开网址、添加到主屏幕，就能像 App 一样用，断网也能玩。

> 网址：**https://zxcb78zxcb.github.io/life-reset-rpg/**
> 网页是公开的，但里面没有任何存档。存档只在你自己的设备上，开了云同步的话在你的私有仓库 `life-rpg-save` 里。

## 这个文件夹里有什么

| 文件 | 作用 |
|---|---|
| `index.html` | 整个游戏（脚本、样式、像素字体都在里面） |
| `sw.js` | 离线缓存：让游戏断网也能打开 |
| `manifest.webmanifest` | 告诉手机这个 App 的名字和图标 |
| `icons/` | 主屏幕上的篝火图标 |
| `.nojekyll` | 告诉 GitHub 原样发布这些文件 |
| `README.md` | 就是这份说明 |

这些文件是 `npm.cmd run build:github` 自动生成的，**不要手动改**，改了下次生成会被覆盖。要改游戏，改项目里的 `src`，再重新生成。

---

## 第一次上传（约 5 分钟）

### 1. 生成最新的手机版
在 PowerShell 里：
```
cd "C:\Users\huang\OneDrive\ドキュメント\ClaudeCode\人生RPG"
npm.cmd run build:github
```
最后显示 `[手机版] 完成` 就好了，这个文件夹里会出现上面那些文件。

### 2. 新建仓库
1. 打开 https://github.com/new
2. Repository name 填 **`life-reset-rpg`**（网址就是按这个名字来的）
3. 选 **Public**（GitHub Pages 免费版只能用公开仓库）
4. 点 **Create repository**

### 3. 上传文件
1. 在新仓库的页面上点 **uploading an existing file**（或者 **Add file → Upload files**）
2. 打开这个 `GitHub` 文件夹，**全选里面的所有东西**（包括 `icons` 文件夹），拖到网页上
3. 等文件列表都出来（应该有 `icons/` 开头的 4 个图标），点 **Commit changes**

### 4. 打开 Pages
1. 仓库页面点 **Settings** → 左侧 **Pages**
2. **Source** 选 **Deploy from a branch**
3. **Branch** 选 `main`，文件夹选 `/ (root)`，点 **Save**
4. 等 1～2 分钟，刷新这个页面，上方会出现网址。打开它，看到标题画面就成功了

## 装到 iPhone
1. 用 **Safari** 打开 https://zxcb78zxcb.github.io/life-reset-rpg/
2. 点底部的 **分享** 按钮 → **添加到主屏幕**
3. 以后从主屏幕的篝火图标打开

## 把电脑上的存档带到手机
- **云同步（推荐）**：电脑和手机都在「数据管理 → 云同步」里填用户名、`life-rpg-save`、Token（步骤见项目里的 `docs/云同步设置.md`）。电脑先同步，手机再填，存档就下载下来了，之后自动同步。
- **手动**：电脑上「导出存档」，用 AirDrop 或 iCloud Drive 传到手机，在手机主屏幕的游戏里「导入存档」。

> 导入、设置云同步，都要在**主屏幕图标打开的游戏**里做。Safari 网页和主屏幕上的游戏，存档是分开的。

---

## 以后改了游戏怎么更新
1. 重新生成：`npm.cmd run build:github`
2. 在 GitHub 的 `life-reset-rpg` 仓库里 **Add file → Upload files**，把这个文件夹里的东西**全部再拖一次**（同名文件会被覆盖），点 **Commit changes**
3. 等 1～2 分钟
4. 手机上联网打开一次游戏，会提示"游戏已更新"，**从后台划掉再打开**就是新版本

> `index.html` 和 `sw.js` 每次都会变，一定要一起上传。只传 `index.html` 的话，手机上可能一直显示旧版本。

## 常见问题
- **打开是 404**：Pages 还没生效，再等一两分钟；或者 Settings → Pages 里 Branch 没选 `main`。
- **打开是空白**：确认网址最后是 `/life-reset-rpg/`；确认 `index.html` 在仓库的最外层，不在某个子文件夹里。
- **主屏幕图标是白色的**：`icons` 文件夹没传上去，再传一次。
- **更新后手机上还是旧的**：联网打开一次，从后台划掉，再打开。
