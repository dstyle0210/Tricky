const {src,dest,watch, task,series} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csscomb = require("gulp-csscomb");
const csso = require("gulp-csso");
const replace = require("gulp-replace");
const ts = require("gulp-typescript");

task("test1",(done)=>{
    watch("./**/*.scss",{usePolling:true}).on("change",(path) => {
        src(path)
        .pipe(sass())
        .pipe(csscomb("zen.json"))
        .pipe(csso())
        .pipe(replace(/}/g,"}\n"))
        .pipe(dest("./"))
        .on("end",()=>{
            console.log(path);
        });
    }).on("ready",() => {
        done();
    });
})

task("test2",(done)=>{
    watch("./**/*.ts",{usePolling:true}).on("change",(path) => {
        src(path)
        .pipe(ts())
        .pipe(dest("./"))
        .on("end",()=>{
            console.log(path);
        });
    }).on("ready",() => {
        done();
    });
})


task("test",series("test1","test2"));