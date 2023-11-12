# -bold（名字还没想好）

## Issue

### 已知问题

暂无已知问题

### TODO

- [ ] 图片点击放大
- [ ] 评论
- [ ] Mermaid 支持
- [ ] 文章图片文件路径替换
- [ ] 日期格式修改
- [ ] 国际化

### 优化

待补充

## 配色

### 博客主题色

在亮色模式下，选择偏蓝的水雾色(#F6F8FA)作为网页背景色，以纯白作为卡片的背景色。选择[瓶覗](https://color-term.com/color/kamenozoki-a5dee4/)和[云水蓝](https://color-term.com/color/yunshuilan-baccd9/)的混合色来分隔正文与顶部菜单栏。

暗色模式下下则选择以不同灰度的黑色来作为主题色。

> 其实配色是随便加的，所以看着违和是正常现象。

### 代码块高亮

亮色主题下代码高亮主题为 [GHColors](./)，暗色模式下代码高亮主题为 [One Dark](https://github.com/atom/atom/tree/master/packages/one-dark-syntax)，并在原样式基础上做了一些微调。

## 项目结构

本项目采用 [Nextjs | App Router](https://nextjs.org/docs/app) 作为文件组织形式，并且未使用 `src` 文件夹

```txt
├── app # 项目源码
│   ├── (default)
│   │   └── about         # 关于页面
│   │   └── article       # 文章页面
│   │   └── home          # 主页页面
│   │   └── post          # 文章列表页面
│   │   └── timeline      # 归档页面
│   ├── global.scss        # 全局样式
│   ├── global.scss        # 博客根布局页面
│   └── page.tsx           # 博客根页面
├── components              # 用于组件
├── external
│   ├── about              # 用于存放关于界面信息
│   ├── config             # 博客设置文件与文章信息文件
│   └── post               # 用于存放文章
├── public                  # 存放文章渲染相关静态文件
│   ├── fonts              # 存放字体文件
│   ├── img                # 存放文章中的图片
│   └── favicon.ico        # 博客 ico 图标
├── styles                  # 存放可被引入全局样式的样式
│   ├── article-element.scss # 文章样式
│   ├── dark-mode          # 暗色模式 CSS 变量
│   ├── default-mode       # 亮色模式 CSS 变量
│   ├── prism-theme        # 代码块主题样式
│   └── fonts              # 字体样式
├── util                    # 工具包
│   ├── func               # 可复用函数
│   └── types              # 可复用类型
├── next-env.d.ts
├── next.config.mjs         # Next.js 配置文件
├── server.ts               # 用于生成文章配置
├── README.md               # 项目说明
└── tsconfig.json

```

## 使用方式

### 全局环境

本项目依赖 Node.js 与 pnpm 构建，请保证安装有满足以下条件的环境：

- Node.js >= 18.16
- pnpm >= 8.0

或者参考下面的命令进行环境安装（windows）：

```bash
# windows
winget install OpenJS.NodeJS.LTS
npm install -g pnpm
pnpm setup
```

### 依赖安装

```bash
pnpm install
```

### 本地预览

```bash
pnpm dev
```

### 构建静态文件

```bash
pnpm build
```

构建产物位于 `out` 目录下，可直接部署至服务器。

### 添加博文

博文仅支持`md` 或 `mdx` 文件，只需将上述文件添加到 `/external/post/` 目录中对应年份的月份目录下，重新构筑项目便可完成添加。博文将按照 `article/[year]/[month]/[link]` 的形式组织路由，其中 `year` 与 `month` 的路由段与文件组织结构强相关，而 `link` 则取自文章 `frontmatter` 中的 `Link` 属性

博文的 `frontmatter` 目前支持指定 7 个属性，其中有 4 个属性是必须指定的。

```yml
Date: 11/12/2023 # 字符串，文章写作日期，格式为 mm/dd/yyyy
Link: page_link # 字符串，文章的最终路由段，需为 ascii 字符
Title: 标题 # 文章标题，用于代替文章的一级标题
Tag: ["classes", "tags", "pub"] # 数组，用于文章分类，分别表示文章的类别、标签与阅读权限
Author: Ming # 字符串，文章作者，可缺省
Cover: "" # 字符串或数组，用于自定义文章封面，可缺省
Description: "" # 字符串，文章描述，可缺省
```

若文章含有图片资源，建议使用远程图床。否则请将图片放入 `/public/images/[path]` 内，并在文章中将图片引入路径改为 `/images/[path]`，以保证图片的正常浏览，必要情况下，可选择在 `/external/config/article-replace/imgPath.json` 中添加路由替换规则。

> 路由替换规则采取从前先后优先级减低的原则，并且每个资源仅替换一次

### 添加友链

可直接在 `/external/config/friends-link/links.json` 中添加友链数据，格式如下：

```json
[
  {
    "name": "友链名称",
    "link": "友链 URL",
    "photo": "友链头像 URL",
    "description": "友链描述"
  }
]
```

### 其他配置项

#### 日期格式

正在努力实现日期格式的可调整，预计会有 `yyyy-mm-dd`、`yyyy/mm/dd`、`mm-dd-yyyy`、`mm/dd/yyyy` 四种格式。

#### 关于页面

关于界面的信息被单独放在 `/external/about` 目录下，可在 `/external/about/about.json` 中添加其他展示项，格式如下：

```json
[
  {
    "title": "标题",
    "key": "unique key",
    "filepath": "文章路径"
  }
]
```

展示内容则可直接编写 Markdown 文档并放置于 `/external/about` 目录下。

#### 标签转换

可在 `/external/config/article-replace/tagTrans.json` 中添加或者修改标签转换规则，匹配的标签可被替换，未匹配的标签则会显示原始值。

> 目前 `classes` 仅支持添加新匹配项，不支持修改

#### 缺省项配置

可在 `/external/config/pages-config/basic.json` 中添加缺省值配置，格式如下:

```json
{
  "author": "默认作者名",
  "cover": "默认亮色封面 URL",
  "darkCover": "默认暗色封面 URL",
  "defaultDescription": "默认文章描述"
}
```

### 部署

项目暂未配置 Github Action ，因此需要手动部署。

## 二次开发

本项目页面主要内容基本都拆分为组件，使用 Css Module 指定样式，并且将配色、文章渲染相关样式放置在 `/styles` 目录下，只需替换原有组件与样式即可。
