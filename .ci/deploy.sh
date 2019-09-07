#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# Based on https://github.com/eldarlabs/ghpages-deploy-script/blob/master/scripts/deploy-ghpages.sh
# Used with their MIT license https://github.com/eldarlabs/ghpages-deploy-script/blob/master/LICENSE

# abort the script if there is a non-zero error
set -ex

npm ci
npm run build

# show where we are on the machine
pwd
remote="git@github.com:hackathon/hackthenorth.com.git"
branch="gh-pages"
domain="hackthenorth.com"

# make a directory to put the gp-pages branch
mkdir deploy-branch
cd deploy-branch
# now lets setup a new repo so we can update the branch
git config --global user.email "platform@hackthenorth.com" > /dev/null 2>&1
git config --global user.name "CircleCI Bot" > /dev/null 2>&1

echo "Pulling from $remote"
git clone --depth 1 --branch "$branch" "$remote" .

# switch into the the production branch
if git rev-parse --verify "origin/$branch" > /dev/null 2>&1
then
    git checkout "$branch"
    # delete any old site as we are going to replace it
    # Note: this explodes if there aren't any, so moving it here for now
    git rm -rf .
else
    git checkout --orphan "$branch"
fi

# copy over or recompile the new site
cp -a ../build/* .

echo "$domain" > CNAME

# stage any changes and new files
git add -A
# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
git commit --allow-empty -m "Deploy to $remote [ci skip]"
# and push, but send any output to /dev/null to hide anything sensitive
git push --force --quiet origin "$branch"
# go back to where we started and remove the production git repo we made and used
# for deployment
cd ..
rm -rf deploy-branch

echo "Finished Deployment!"
