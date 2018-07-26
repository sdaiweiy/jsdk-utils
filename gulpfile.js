let gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    typedoc = require("gulp-typedoc"),
    rollup = require('rollup'),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    header = require("gulp-header"),
    runSequence = require("run-sequence"),
    resolve = require('rollup-plugin-node-resolve'),
    rollupTypescript = require('rollup-plugin-typescript');


//打包ts版本的代码,按模块分离文件
gulp.task("build-source", function () {
    let tsProject = tsc.createProject('./tsconfig.json', {target: "es6"});
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest("./dist"));
});

//打包es6版本的代码,单文件供浏览器直接访问
gulp.task("dist-source-es5", function () {
    return rollup.rollup({
        input: './src/index.ts',
        plugins: [
            rollupTypescript({
                tsconfig: {
                    compilerOptions: {
                        target: "es5"
                    }
                },
                typescript: require('typescript')
            })/*,
            resolve({
                jsnext: true,
                main: true,
                browser: true
            })*/
        ]
    }).then(bundle => {
        return bundle.write({
            file: './dist/jsdk.utils.es5.js',
            format: 'iife',
            name: 'Jsdk.Utils',
            sourcemap: true
        });
    });
});

//打包es3版本的代码,单文件供浏览器直接访问
gulp.task("dist-source-es3", function () {
    return rollup.rollup({
        input: './src/index.ts',
        plugins: [
            rollupTypescript({
                tsconfig: {
                    compilerOptions: {
                        target: "es3"
                    }
                },
                typescript: require('typescript')
            })
        ]
    }).then(bundle => {
        return bundle.write({
            file: './dist/jsdk.utils.es3.js',
            format: 'iife',
            name: 'Jsdk.Utils',
            sourcemap: true
        });
    });
});

gulp.task("compress-es5", function () {
    return gulp.src("./dist/jsdk.utils.es5.js")
        .pipe(uglify({}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./dist"))
});

gulp.task("compress-es3", function () {
    return gulp.src("./dist/jsdk.utils.es3.js")
        .pipe(uglify({ie8: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./dist"))
});

gulp.task("header", function () {
    let pkg = require(__dirname + "/package.json");

    let banner = ["/**",
        " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
        " * Copyright (c) 2018 <%= pkg.author %>",
        " * <%= pkg.license %>",
        " * <%= pkg.homepage %>",
        " */",
        ""].join("\n");

    return gulp.src(["./dist/jsdk.utils.es3.js", "./dist/jsdk.utils.es3.min.js", "./dist/jsdk.utils.es5.js", "./dist/jsdk.utils.es5.min.js"])
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest("./dist"));
});

gulp.task("document", function () {
    return gulp.src(["./src/**/*.ts"])
        .pipe(typedoc({
            module: 'commonjs',
            target: 'es6',

            out: "./documentation",
            name: "jsdk-utils-api",
            ignoreCompilerErrors: true
        }));
});

gulp.task('build-es6', function (cb) {
    runSequence(
        //"lint",
        "build-source",
        //["run-unit-test"],
        cb);
});

gulp.task('build-es5', function (cb) {
    runSequence(
        "build-es6",
        "dist-source-es5",
        "compress-es5",
        "header",
        cb);
});

gulp.task('build-es3', function (cb) {
    runSequence(
        "build-es6",
        "dist-source-es3",
        "compress-es3",
        "header",
        cb);
});
