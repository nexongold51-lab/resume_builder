#!/usr/bin/env bash
# Run this once with your own sudo privileges to create the app DB role and database.
# Usage: bash scripts/setup-postgres.sh
set -euo pipefail

DB_NAME="resume_builder"
DB_USER="resume_builder_user"
DB_PASS="resume_builder_dev_pass"

sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;

SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec

GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
SQL

echo "Done. Connection string:"
echo "postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"
