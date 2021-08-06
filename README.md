# Refactor_Homepage
Refactoring this hompage

- start
```
 $ npm start
```

- src directory structure
```bash
├── components
│   ├── Login
|   │   ├── OAuth.js
|   │   └── SocailLogin.js
│   ├── DetailBtn.js
│   ├── ImageTitle.js
│   ├── Navbar.js
│   └── index.css
├── HomeEditor
│   ├── data
│   ├── Detailer
│   ├── Item
│   ├── moudle
│   ├── temp
│   └── Editor.js
├── Pages
│   ├── Connect.js
│   ├── EditorSelect.js
│   ├── ExplainDetail.js
│   ├── Home.js
│   ├── HomeEditor.js
│   ├── Login.js
│   └── SelectProblem.js
├── redux
│   ├── modules
|   │   └── user.js
│   └── store
|   |   ├── modules
|   │   ├── configure.js
|   │   └── exportStore.js
├── resource
│   ├── font
│   └── image
├── App.js
├── index.js
├── serviceWorker.js
├── setupProxy.js
├── setupTests.js
├── .babelrc
└── webpack.config.js
``` 

- CORS ERROR 해결방법
[Chrome 사용시 참고 방법:](https://haru.kafra.kr/68)
경로 아래에 명령어 추가
```
--disable-web-security --user-data-dir="C:\chrome"
```
