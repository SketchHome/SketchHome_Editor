## SketchHome_Editor
StartUP <NextLiving> 3D Home Editor, 사용자들이 집을 보다 더 쉽고 예쁘게 꾸밀 수 있도록 실제 같은 인테리어 공간을 제공하는 홈 에디터를 개발합니다.

## Overview
![image](https://user-images.githubusercontent.com/44183221/131128100-0d95ab22-c630-4189-904b-2ba8aab3f11d.png)

## Live Demo
http://www.editsketchhome.com/editor

- start
```
 $ npm start
```

- build
```
 $ npm run-script build
```

## deploy Log
```
 2021.09.02 Version 1 build Complete
 2021.09.03 Update Version 1 -> Version 2 
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

## CORS ERROR 해결방법
[Chrome 사용시 참고 방법:](https://haru.kafra.kr/68)
경로 아래에 명령어 추가
```
--disable-web-security --user-data-dir="C:\chrome"
```

## 배포 방법 (참고)
```
 Using Nginx - if you need to Update & Deploy this Project
 Follow this command :)
 
 1. Connect to XShell
 2. cd SketchHome_Editor
 3. git pull origin master (you already git clone)
 4. npm install
 5. npm run-script build
 6. service nginx restart
 
 option. check start and See, Port or Infomation
- sudo netstat -ntlp

```
