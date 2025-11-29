#!/bin/bash

USER=root
SERVER=159.65.55.89
LOCAL_DIRECTORY=~/Code/mincepie/out/
REMOTE_DIRECTORY=/var/www/mincepie/web

for flag in "$@"
do
    if [ "$flag" = "--dry-run" ]; then
        RSYNCFLAGS="--dry-run"
    fi
done

RSYNCFLAGS="${RSYNCFLAGS} --no-owner --no-group --no-perms"

echo "Deploying site to ${SERVER}: ${RSYNCFLAGS}"
rsync -avzci ${LOCAL_DIRECTORY} ${USER}@${SERVER}:${REMOTE_DIRECTORY} ${RSYNCFLAGS}
