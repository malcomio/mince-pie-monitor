#!/bin/bash

script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

rsync_user=root
server=159.65.55.89
local_dir="${script_dir}/../out/"
remote_dir=/var/www/mincepie/web

for flag in "$@"
do
    if [ "$flag" = "--dry-run" ]; then
        rsync_flags="--dry-run"
    fi
done

rsync_flags="${rsync_flags} --no-owner --no-group --no-perms"

echo "Deploying site to ${server}: ${rsync_flags}"
rsync -avzci ${local_dir} ${rsync_user}@${server}:${remote_dir} ${rsync_flags}
