#!/bin/bash

# This script links or unlinks local versions of vets-api and vets-website with vets-json-schema
# Usage: ./local-link.sh link vets-api     - to link vets-api
#        ./local-link.sh link vets-website - to link vets-website
#        ./local-link.sh unlink vets-api   - to unlink vets-api
#        ./local-link.sh unlink vets-website - to unlink vets-website

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [link|unlink] [vets-api|vets-website]"
    exit 1
fi

action="$1"
project="$2"

if [ "$action" != "link" ] && [ "$action" != "unlink" ]; then
    echo "Invalid action: $action"
    echo "Usage: $0 [link|unlink] [vets-api|vets-website]"
    exit 1
fi

if [ "$project" != "vets-api" ] && [ "$project" != "vets-website" ]; then
    echo "Invalid project: $project"
    echo "Usage: $0 [link|unlink] [vets-api|vets-website]"
    exit 1
fi

link_vets_api() {
    echo "Linking vets-api..."
    cd ../vets-api
    bundle config set local.vets_json_schema ../vets-json-schema
    bundle config disable_local_branch_check true
    echo "vets-api linked."
}

unlink_vets_api() {
    echo "Unlinking vets-api..."
    cd ../vets-api
    bundle config unset local.vets_json_schema
    bundle config unset disable_local_branch_check
    git checkout Gemfile.lock
    bundle install
    echo "vets-api unlinked."
}

link_vets_website() {
    echo "Linking vets-website..."
    yarn link
    cd ../vets-website
    yarn link vets-json-schema
    echo "vets-website linked."
}

unlink_vets_website() {
    echo "Unlinking vets-website..."
    cd ../vets-website
    yarn unlink vets-json-schema
    # yarn -W add vets-json-schema
    cd ../vets-json-schema
    yarn unlink
    echo "vets-website unlinked."
}

case "$action" in
    link)
        case "$project" in
            vets-api) link_vets_api ;;
            vets-website) link_vets_website ;;
        esac
        ;;
    unlink)
        case "$project" in
            vets-api) unlink_vets_api ;;
            vets-website) unlink_vets_website ;;
        esac
        ;;
esac
