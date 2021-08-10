const fs = require('fs');
const path = require('path');

const argv = process.argv;

const legacyJSONPath = argv[2];
const legacyJSON = JSON.parse(fs.readFileSync(legacyJSONPath).toString());

const newJSON = {
  "$schema": "./node_modules/@angular-devkit/core/src/workspace/workspace-schema.json",
  "version": 1,
  "newProjectRoot": "src",
  "projects": {}
};

legacyJSON.apps.forEach(app => {
  const platformType = app.platform || 'browser';
  const rootPath = app.root;
  const environmentSource = path.relative(path.join(__dirname), path.join(__dirname, app.root, app.environmentSource));

  /**
   * Configuration
   **/
  const configurations = {};
  if (platformType === 'browser') {
    Object.keys(app.environments).forEach(env => {
      if (env === 'dev') return;
      configurations[(env === 'prod' ? 'production' : env)] = {
        "fileReplacements": [
          {
            "src": environmentSource,
            "replaceWith": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.environments[env]))
          }
        ],
        "optimization": true,
        "outputHashing": "all",
        "sourceMap": false,
        "extractCss": true,
        "namedChunks": false,
        "aot": true,
        "extractLicenses": true,
        "vendorChunk": false,
        "buildOptimizer": true
      }
    });
  } else {
    Object.keys(app.environments).forEach(env => {
      if (env === 'dev') return;
      configurations[(env === 'prod' ? 'production' : env)] = {
        "environment": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.environments[env]))
      }
    });
  }

  /**
   * Options
   **/
  const options = {
    "outputPath": app.outDir,
    "main": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.main)),
    "tsConfig": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.tsconfig)),
  };

  options.serviceWorker = !!app.serviceWorker;

  if (app.stylePreprocessorOptions) {
    options.stylePreprocessorOptions = app.stylePreprocessorOptions;
    options.stylePreprocessorOptions.includePaths = options.stylePreprocessorOptions.includePaths.map(stylePath => {
      return path.relative(path.join(__dirname), path.join(__dirname, app.root, stylePath));
    });
  }

  if (platformType === 'browser') {
    options['index'] = path.relative(path.join(__dirname), path.join(__dirname, app.root, app.index));
    options['assets'] = [];
    options['styles'] = [];
    options['scripts'] = [];

    app.assets.forEach(asset => {
      if (typeof asset === 'string') {
        const filename = path.basename(asset);
        const filePath = path.join(app.root, asset);
        const stats = fs.lstatSync(filePath);
        if (stats.isDirectory()) {
          options.assets.push({glob: '**/*', input: filePath, output: filename});
        } else {
          let inputPath = filePath.split('/');
          inputPath.pop();
          inputPath = inputPath.join('/');
          options.assets.push({glob: filename, input: inputPath, output: filename});
        }
      } else {
        options.assets.push(Object.assign({}, asset, {
          input: path.relative(path.join(__dirname), path.join(__dirname, app.root, asset.input))
        }));
      }
    });

    app.styles.forEach(style => {
      if (typeof style === 'string') {
        const filePath = path.relative(path.join(__dirname), path.join(__dirname, app.root, style));
        options.styles.push(filePath);
      } else {
        options.styles.push(Object.assign({}, asset, {
          input: path.relative(path.join(__dirname), path.join(__dirname, app.root, style.input))
        }));
      }
    });

    app.scripts.forEach(script => {
      if (typeof script === 'string') {
        const filePath = path.relative(path.join(__dirname), path.join(__dirname, app.root, script));
        options.scripts.push(filePath);
      } else {
        options.scripts.push(Object.assign({}, asset, {
          input: path.relative(path.join(__dirname), path.join(__dirname, app.root, script.input))
        }));
      }
    });
  }

  if (app.polyfills) { // polyfills dose not exists on Server cli setting
    options['polyfills'] = path.relative(path.join(__dirname), path.join(__dirname, app.root, app.polyfills));
  }

  newJSON.projects[app.name] = {
    "root": app.root,
    "projectType": "application",
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:" + platformType,
        "options": options,
        "configurations": configurations
      }
    }
  };

  if (platformType === 'browser') {
    if (app.testTsconfig) {
      const testOptions = {
        "main": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.test)),
        "polyfills": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.polyfills)),
        "tsConfig": path.relative(path.join(__dirname), path.join(__dirname, app.root, app.testTsconfig)),
        "karmaConfig": rootPath + "/karma.conf.js",
        "styles": [],
        "scripts": [],
        "assets": []
      };
      if (app.polyfills) { // polyfills dose not exists on Server cli setting
        testOptions['polyfills'] = path.relative(path.join(__dirname), path.join(__dirname, app.root, app.polyfills));
      }
      testOptions['tsConfig'] = path.relative(path.join(__dirname), path.join(__dirname, app.root, app.testTsconfig));
      Object.assign(newJSON.projects[app.name].architect, {
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": testOptions
        }
      });
    }
    Object.assign(newJSON.projects[app.name].architect, {
      "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
          "browserTarget": app.name + ":build"
        },
        "configurations": {
          "production": {
            "browserTarget": app.name + ":build:production"
          }
        }
      },
      "extract-i18n": {
        "builder": "@angular-devkit/build-angular:extract-i18n",
        "options": {
          "browserTarget": app.name + ":build"
        }
      },
      "lint": {
        "builder": "@angular-devkit/build-angular:tslint",
        "options": {
          "tsConfig": [
            path.relative(path.join(__dirname), path.join(__dirname, app.root, app.tsconfig))
          ],
          "exclude": [
            "**/node_modules/**"
          ]
        }
      }
    });
  }
});

fs.writeFileSync("angular.json", JSON.stringify(newJSON));
console.log(newJSON);