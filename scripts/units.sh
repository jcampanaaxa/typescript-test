#!/bin/bash
DEFAULT_CONCURRENCY=1
CONCURRENCY=${1:-$DEFAULT_CONCURRENCY}

npm run units -- --concurrency $CONCURRENCY
