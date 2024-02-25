-- Create two users for the DB, ie postgres_write and postgres_read
DO $do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres_write') THEN
        CREATE ROLE postgres_write;
    END IF;
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres_read') THEN
        CREATE ROLE postgres_read;
        GRANT postgres_read TO postgres_write;
    END IF;
END
$do$;

-- Get the users passwords from env variables.
ALTER ROLE postgres_read WITH LOGIN PASSWORD 'password';
ALTER ROLE postgres_write WITH LOGIN PASSWORD 'password';
GRANT CONNECT ON DATABASE postgres_db TO postgres_read;
GRANT ALL PRIVILEGES ON DATABASE postgres_db TO postgres_write;

-- Connect to the database to run migrations.
\connect postgres_db;

-- Grant all read permissions to pq_read user
GRANT USAGE ON SCHEMA public TO postgres_read;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO postgres_read;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO postgres_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO postgres_read;
ALTER DEFAULT PRIVILEGES FOR USER postgres_write IN SCHEMA public GRANT SELECT ON TABLES TO postgres_read;
ALTER DEFAULT PRIVILEGES FOR USER postgres IN SCHEMA public GRANT SELECT ON TABLES TO postgres_read;

-- Grant all read permissions to postgres_write user
GRANT CREATE ON SCHEMA public TO postgres_write;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres_write;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO postgres_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO postgres_write;
ALTER DEFAULT PRIVILEGES FOR USER postgres IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO postgres_write;

-- Create all required tables below.
CREATE TABLE IF NOT EXISTS public.cars (
    id SERIAL PRIMARY KEY,
    part_number VARCHAR(255),
    alt_part_number VARCHAR(255),
    name VARCHAR(255),
    brand VARCHAR(255),
    model VARCHAR(255),
    engine VARCHAR(255),
    location_a VARCHAR(255),
    location_a_stock NUMERIC,
    location_b VARCHAR(255),
    location_b_stock NUMERIC,
    unit VARCHAR(50),
    rate NUMERIC,
    value INTEGER,
    remarks TEXT
);
