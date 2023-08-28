## React 开发规范

项目目录结构

```
├── src
│   ├── api                       # 所有业务接口统一管理在这文件夹下
│   │   ├── home                  # 每个模块区分开
│   │   │   ├── index.ts          # 写api的文件
│   │   │   └── type.ts           # api的类型文件
│   │   └── index.js              # 统一导出
│   ├── components                # 存放公共组件
│   │   └── Dialog                
│   │       ├── index.tsx         # tsx文件
│   │       └── index.module.scss # css文件
│   ├── constants                 # 存放常量
│   │   ├── home.ts               
│   │   └── user.ts             
│   ├── hooks                     # 自定义Hooks
│   │   ├── useDebounce.ts               
│   │   └── useTitle.ts             
│   ├── pages                     # 页面组件文件夹
│   │   ├── home               
│   │   │   ├── components        # 页面组件
│   │   │   │   └── Button.tsx    
│   │   │   ├── index.tsx         # tsx
│   │   │   └── index.module.scss # css
│   ├── stores                    # 状态管理文件夹
│   │   ├── home.ts               # 每个模块区分开
│   │   └── index.ts              # 统一导出
│   ├── styles                    # 公共样式，主题
│   │   └── index.scss            
│   ├── utils                     # 工具类文件夹
│   │   ├── date.ts               
│   │   ├── message.ts            
│   │   └── index.ts              
│   ├── vitePlugin                # 自定义vite插件
│   │   └── versionUpdatePlugin.ts           
│   ├── App.tsx                   
│   ├── main.tsx                  # 入口文件
│   └── vite-env.d.ts                
├── .editorconfig                 # 代码编辑格式配置
├── .env                          # 环境变量配置文件
├── .eslintrc.cjs                 # eslint配置
├── .gitignore                    # git忽略
├── .prettierignore               # prettier忽略文件配置
├── .prettierrc                   # 代码格式风格配置
├── index.html                    # index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Naming Conventions

- Component file naming: use PascalCase, such as: `MyComponent.jsx`
- Component folder naming: use PascalCase, such as: `MyComponent`
- Variable naming: use camelCase, such as: `myVariable`

### 命名规范

- 组件文件命名：使用大驼峰命名法，如：`MyComponent.jsx`
- 组件文件夹命名：使用大驼峰命名法，如：`MyComponent`
- 变量命名：使用小驼峰命名法，如：`myVariable`

### Code Style

- Use 2 spaces for code indentation
- No extra spaces
- No console.log
- Add spaces before and after the object
- Use double quotes
- Use semicolons to end statements
- The file does not exceed 500 lines, try to split the component
- Add comments to each method, including parameters
- Use absolute paths to import files

### 代码风格

- 代码缩进使用 2 个空格
- 不要出现多余的空格
- 不要出现console.log
- 对象前后加空格
- 使用双引号
- 语句结束使用分号
- 文件不超过 500 行，尽量拆分组件
- 每个方法添加注释，包括参数
- 使用绝对路径引入文件

一些比较好的规范的最佳实践
> [21 Best Practices for a Clean React Project](https://dev.to/mohammadfaisal/21-best-practices-for-a-clean-react-project-jdf)

