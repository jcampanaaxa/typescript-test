#!/bin/bash
DEFAULT_TEST=false

BUMP_TYPE=$1
TEST_FLAG=${2:-$DEFAULT_TEST}

git reset --hard || { echo 'Auto merge failed' ; exit 1; }
git checkout master || { echo 'Auto merge failed' ; exit 1; }
git merge origin/develop --no-ff --no-edit || { echo 'Auto merge failed' ; exit 1; }
npm prune || { echo 'Failed on npm prune' ; exit 1; }
npm install || { echo 'Npm installation failed' ; exit 1; }
npm run test || { echo 'Tests failed' ; exit 1; }

npm run standard-version -- --release-as $BUMP_TYPE --no-verify -a || { echo 'Can not release the packages' ; exit 1; }

HASH=`git log|head -1|cut -d ' ' -f 2`
git checkout develop || { echo 'Can not checkout develop' ; exit 1; }
git cherry-pick -n $HASH  || { echo 'Can not cherry pick master commit to develop' ; exit 1; }
git checkout HEAD -- npm-srinkwrap.json
git commit -m "chore: cherry pick commit master/$HASH"

if [ "$TEST_FLAG" != false ]
then
  git push --follow-tags origin develop
  git push --follow-tags origin master
fi
