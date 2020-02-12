## Express Typescript Boilerplate

### Initialize new project

```bash
npm init -y
```

### Install packages

```bash
npm i express morgan ejs cookie-parser debug http-errors
```

### Install typescript Types
```bash
npm i @types/node @types/express @types/morgan @types/cookie-parser @types/debug @types/http-errors
```

### Install development dependencies
```bash
npm i ts-node tslint typescript nodemon gulp gulp-typescript del
```

### Create tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "strict": true,
    "baseUrl": "./",
    "outDir": "build",
    "removeComments": true,
    "experimentalDecorators": true,
    "target": "es6",
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "types": [
      "node"
    ],
    "typeRoots": [
      "node_modules/@types"
    ]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    ".vscode"
  ]
}
```

### Create tslint.json
```json
{
    "extends": "tslint:recommended",
    "rules": {
        "max-line-length": {
            "options": [
                200
            ]
        },
        "member-ordering": false,
        "no-consecutive-blank-lines": false,
        "object-literal-sort-keys": false,
        "ordered-imports": false,
        "quotemark": [
            true,
            "single"
        ],
        "variable-name": [
            true,
            "allow-leading-underscore"
        ],
        "no-console": false,
        "trailing-comma": [
            true,
            {
                "singleline": "never"
            }
        ]
    }
}
```

### Create gulpfile.js
```javascript
const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', () => {
  return del('dist/**', { force: true });
});

gulp.task('typescript-compile', () => {
  const tsProject = ts.createProject('tsconfig.json');
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copy-static-resources', () => {
  return gulp.src('src/public/**')
    .pipe(gulp.dest('dist/public'));
});

gulp.task('copy-views', () => {
  return gulp.src('src/views/**')
    .pipe(gulp.dest('dist/views'));
});

gulp.task('default', gulp.series('clean', 'typescript-compile', 'copy-static-resources', 'copy-views'));
```
### Create files and folders as in the repository.

### Paste scripts in  package.json scripts section
```
"start": "ts-node ./src/startup.ts",
"dev": "nodemon --exec ts-node ./src/startup.ts",
"build": "gulp"
```

### Add vs code debug configuration as follow
 Click debug > Add configurations > select node.js and put the below code in launch.json
 ```json
 {
    "version": "0.2.0",
    "configurations": [        
        {
            "name": "ts",
            "type": "node",
            "request": "launch",
            "cwd": "${workspaceRoot}",
            "runtimeArgs": [
                "-r",
                "ts-node/register"
            ],
            "args": [
                "${workspaceRoot}/src/startup.ts"
            ]
        }
    ]
}
```

### Run app
```bash
npm start 
```

### Run app in change tracking mode
```bash
npm run dev 
```

### Build app
```bash
npm run build 
```

### Test build code
```bash
node dist/startup.js
```

