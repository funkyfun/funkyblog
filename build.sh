#!/usr/bin/env sh

set -e
yarn build

cd docs/.vuepress/dist

echo 'blog.funkyfun.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:funkyfun/funkyblog.git master:gh-pages

cd -
