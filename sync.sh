#!/bin/sh

# This script applies all migration files in the specified directory to a Turso database.

if [ -z "$1" ]; then
  echo "Usage: $0 <turso-database-name>"
  exit 1
fi

ls -1 src/lib/prisma/migrations | sort | while read -r item; do
  if [ ! -d "src/lib/prisma/migrations/$item" ]; then
    echo "Skipping $item, not a directory"
    continue
  fi

  full_path="src/lib/prisma/migrations/$item/migration.sql"
  echo "Processing $full_path"

  turso db shell $1 < "$full_path"

  if [ $? -ne 0 ]; then
    echo "Error processing $full_path"
    exit 1
  fi
done
