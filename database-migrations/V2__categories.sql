CREATE TABLE "categories" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES app_user(id),
    CONSTRAINT unique_category_per_user UNIQUE (user_id, name)
);