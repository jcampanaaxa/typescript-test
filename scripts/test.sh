#!/bin/bash
DEFAULT_FAILFAST_FLAG=false
DEFAULT_CONCURRENCY=4

CONCURRENCY=${1:-$DEFAULT_CONCURRENCY}
FAILFAST_FLAG=${2:-$DEFAULT_FAILFAST_FLAG}
FAILFAST="{ echo ''; }"

if [ "$FAILFAST_FLAG" != false ]
then
  FAILFAST="{ echo 'FAILED!' ; exit 1; }"
fi

npm run eslint -- . || eval $FAILFAST
npm run units concurrency=$CONCURRENCY || eval $FAILFAST
