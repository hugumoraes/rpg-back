CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR,
  "last_name" VARCHAR,
  "email" VARCHAR UNIQUE,
  "password" VARCHAR,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "classes" (
  "class_id" SERIAL PRIMARY KEY,
  "name" VARCHAR UNIQUE NOT NULL
);

CREATE TABLE "characters" (
  "character_id" SERIAL PRIMARY KEY,
  "class_id" INTEGER,
  "name" VARCHAR UNIQUE NOT NULL,
  "user_id" INTEGER,
  "alive" BOOLEAN DEFAULT TRUE,
  "level" INTEGER DEFAULT 1,
  "xp" INTEGER DEFAULT 0,
  "money" INTEGER DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("class_id") REFERENCES "classes" ("class_id") ON DELETE CASCADE,
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
);


CREATE TABLE "attributes" (
  "attribute_id" SERIAL PRIMARY KEY,
  "name" VARCHAR UNIQUE,
  "description" VARCHAR
);

CREATE TABLE "items" (
  "item_id" SERIAL PRIMARY KEY,
  "name" VARCHAR UNIQUE NOT NULL,
  "description" TEXT,
  "value" INTEGER DEFAULT 0,
  "rarity" VARCHAR DEFAULT 'common'
);

CREATE TABLE "character_attribute" (
  "character_attribute_id" SERIAL PRIMARY KEY,
  "character_id" INTEGER,
  "attribute_id" INTEGER,
  "value" INTEGER DEFAULT 0,
  FOREIGN KEY ("character_id") REFERENCES "characters" ("character_id") ON DELETE CASCADE,
  FOREIGN KEY ("attribute_id") REFERENCES "attributes" ("attribute_id") ON DELETE CASCADE
);

CREATE TABLE "class_attribute" (
  "class_attribute_id" SERIAL PRIMARY KEY,
  "class_id" INTEGER,
  "attribute_id" INTEGER,
  "value" INTEGER DEFAULT 0,
  FOREIGN KEY ("class_id") REFERENCES "classes" ("class_id") ON DELETE CASCADE,
  FOREIGN KEY ("attribute_id") REFERENCES "attributes" ("attribute_id") ON DELETE CASCADE
);

CREATE TABLE "character_item" (
  "character_item_id" SERIAL PRIMARY KEY,
  "character_id" INTEGER,
  "item_id" INTEGER,
  FOREIGN KEY ("character_id") REFERENCES "characters" ("character_id") ON DELETE CASCADE,
  FOREIGN KEY ("item_id") REFERENCES "items" ("item_id") ON DELETE CASCADE
);

CREATE TABLE "item_attribute" (
  "item_attribute_id" SERIAL PRIMARY KEY,
  "item_id" INTEGER,
  "attribute_id" INTEGER,
  "value" INTEGER DEFAULT 0,
  FOREIGN KEY ("item_id") REFERENCES "items" ("item_id") ON DELETE CASCADE,
  FOREIGN KEY ("attribute_id") REFERENCES "attributes" ("attribute_id") ON DELETE CASCADE
);

CREATE TABLE "equipment_slot" (
  "equipment_slot_id" SERIAL PRIMARY KEY,
  "name" VARCHAR UNIQUE NOT NULL
);

CREATE TABLE "character_equipment" (
  "character_equipment_id" SERIAL PRIMARY KEY,
  "equipment_slot_id" INTEGER,
  "character_id" INTEGER,
  "item_id" INTEGER,
  CONSTRAINT unique_character_slot UNIQUE ("character_id", "equipment_slot_id"),
  FOREIGN KEY ("equipment_slot_id") REFERENCES "equipment_slot" ("equipment_slot_id") ON DELETE CASCADE,
  FOREIGN KEY ("character_id") REFERENCES "characters" ("character_id") ON DELETE CASCADE,
  FOREIGN KEY ("item_id") REFERENCES "items" ("item_id") ON DELETE CASCADE
);
