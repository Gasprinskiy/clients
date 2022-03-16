import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js"

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js"
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js"
import { fonts } from "./gulp/tasks/fonts.js";

function wathcer() {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
}

const mainTasks = gulp.parallel(html, fonts, scss, js)
const serverTask = gulp.parallel(wathcer, server)

const dev = gulp.series(reset, mainTasks, serverTask);

gulp.task('default', dev)