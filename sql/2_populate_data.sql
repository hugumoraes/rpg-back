

-- CREATE TABLE "ability_type" (
--   "ability_type_id" SERIAL PRIMARY KEY,
--   "name" VARCHAR UNIQUE NOT NULL,
--   "desc" VARCHAR
-- );

-- CREATE TABLE "ability" (
--   "ability_id" SERIAL PRIMARY KEY,
--   "name" VARCHAR UNIQUE NOT NULL,
--   "ability_type_id" INTEGER,
--   FOREIGN KEY ("ability_type_id") REFERENCES "ability_type" ("ability_type_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "class_ability" (
--   "class_ability_id" SERIAL PRIMARY KEY,
--   "class_id" INTEGER,
--   "ability_id" INTEGER,
--   FOREIGN KEY ("class_id") REFERENCES "class" ("class_id") ON DELETE CASCADE,
--   FOREIGN KEY ("ability_id") REFERENCES "ability" ("ability_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "effect_type" (
--   "effect_type_id" SERIAL PRIMARY KEY,
--   "name" VARCHAR UNIQUE NOT NULL,
--   "desc" VARCHAR
-- );

-- CREATE TABLE "status_effect" (
--   "status_effect_id" SERIAL PRIMARY KEY,
--   "name" VARCHAR UNIQUE NOT NULL,
--   "effect_type_id" INTEGER,
--   "duration" INTEGER DEFAULT 0,
--   "desc" VARCHAR,
--   FOREIGN KEY ("effect_type_id") REFERENCES "effect_type" ("effect_type_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "character_status_effect" (
--   "character_status_effect_id" SERIAL PRIMARY KEY,
--   "character_id" INTEGER,
--   "status_effect_id" INTEGER,
--   "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY ("character_id") REFERENCES "characters" ("character_id") ON DELETE CASCADE,
--   FOREIGN KEY ("status_effect_id") REFERENCES "status_effect" ("status_effect_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "loot" (
--   "loot_id" SERIAL PRIMARY KEY,
--   "xp" INTEGER DEFAULT 0,
--   "money" INTEGER DEFAULT 0
-- );

-- CREATE TABLE "entity_loot" (
--   "entity_loot_id" SERIAL PRIMARY KEY,
--   "loot_id" INTEGER,
--   "entity_id" INTEGER,
--   FOREIGN KEY ("loot_id") REFERENCES "loot" ("loot_id") ON DELETE CASCADE,
--   FOREIGN KEY ("entity_id") REFERENCES "entities" ("entity_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "item_loot" (
--   "item_loot_id" SERIAL PRIMARY KEY,
--   "loot_id" INTEGER,
--   "item_id" INTEGER,
--   "drop_chance" DECIMAL CHECK (drop_chance BETWEEN 0 AND 1),
--   FOREIGN KEY ("loot_id") REFERENCES "loot" ("loot_id") ON DELETE CASCADE,
--   FOREIGN KEY ("item_id") REFERENCES "item" ("item_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "entity_class" (
--   "entity_class_id" SERIAL PRIMARY KEY,
--   "entity_id" INTEGER,
--   "class_id" INTEGER,
--   FOREIGN KEY ("entity_id") REFERENCES "entities" ("entity_id") ON DELETE CASCADE,
--   FOREIGN KEY ("class_id") REFERENCES "class" ("class_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "entity_status_effect" (
--   "entity_status_effect_id" SERIAL PRIMARY KEY,
--   "entity_id" INTEGER,
--   "status_effect_id" INTEGER,
--   "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY ("entity_id") REFERENCES "entities" ("entity_id") ON DELETE CASCADE,
--   FOREIGN KEY ("status_effect_id") REFERENCES "status_effect" ("status_effect_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "title" (
--   "title_id" SERIAL PRIMARY KEY,
--   "name" VARCHAR UNIQUE NOT NULL
-- );

-- CREATE TABLE "character_title" (
--   "character_title_id" SERIAL PRIMARY KEY,
--   "character_id" INTEGER,
--   "title_id" INTEGER,
--   CONSTRAINT unique_character_title UNIQUE ("character_id", "title_id"),
--   FOREIGN KEY ("character_id") REFERENCES "characters" ("character_id") ON DELETE CASCADE,
--   FOREIGN KEY ("title_id") REFERENCES "title" ("title_id") ON DELETE CASCADE
-- );

-- -- Indexes for better performance
-- CREATE INDEX idx_item_name ON item (name);
-- CREATE INDEX idx_status_effect_name ON status_effect (name);

INSERT INTO classes (name) VALUES
('Warrior'),
('Mage'),
('Rogue'),
('Ranger');

INSERT INTO attributes ("name", "description") VALUES
('Strength', 'A measure of how physically strong a character is.'),
('Dexterity', 'A measure of how agile a character is.'),
('Intelligence', 'A measure of a character''s problem-solving ability.'),
('Luck', 'A measure of a character having chance to favor him or her.'),
('Health', 'A measure of a character''s physical well-being.'),
('Mana', 'A measure of a character''s magical energy.');

-- Warrior:
INSERT INTO class_attribute (class_id, attribute_id, "value")
VALUES
  (1, 1, 10), -- Strength = 10
  (1, 2, 5),  -- Dexterity = 5
  (1, 3, 2),  -- Intelligence = 2
  (1, 4, 3),  -- Luck = 3
  (1, 5, 100), -- Health = 100
  (1, 6, 50);  -- Mana = 50

-- Mage:
INSERT INTO class_attribute (class_id, attribute_id, "value")
VALUES
  (2, 1, 2),  -- Strength = 1
  (2, 2, 4),  -- Dexterity = 4
  (2, 3, 10), -- Intelligence = 10
  (2, 4, 5),  -- Luck = 5
  (2, 5, 100), -- Health = 100
  (2, 6, 50);  -- Mana = 50

-- Rogue:
INSERT INTO class_attribute (class_id, attribute_id, "value")
VALUES
  (3, 1, 5),  -- Strength = 5
  (3, 2, 10), -- Dexterity = 8
  (3, 3, 4),  -- Intelligence = 1
  (3, 4, 6),  -- Luck = 6
  (3, 5, 100), -- Health = 100
  (3, 6, 50);  -- Mana = 50

-- Ranger:
INSERT INTO class_attribute (class_id, attribute_id, "value")
VALUES
  (4, 1, 6),  -- Strength = 2
  (4, 2, 8),  -- Dexterity = 10
  (4, 3, 5),  -- Intelligence = 2
  (4, 4, 9),  -- Luck = 6
  (4, 5, 100), -- Health = 100
  (4, 6, 50);  -- Mana = 50

INSERT INTO items ("name", "description", "value", "rarity")
VALUES
  ('Iron Sword', 'A sturdy iron sword, commonly used by warriors.', 15, 'common'),
  ('Health Potion', 'A small vial that restores health when consumed.', 10, 'common'),
  ('Leather Armor', 'Basic armor made of hardened leather.', 20, 'common'),
  ('Magic Wand', 'A simple wooden wand infused with weak magical energy.', 25, 'rare'),
  ('Thief’s Dagger', 'A small, sharp dagger preferred by rogues.', 18, 'common');

INSERT INTO item_attribute (item_id, attribute_id, "value")
VALUES
  (1, 1, 5),  -- Iron Sword increases Strength by 5
  (2, 5, 25),  -- Health Potion increases Health by 25
  (3, 1, 3),  -- Leather Armor increases Strength by 3
  (4, 3, 8),  -- Magic Wand increases Intelligence by 8
  (5, 2, 6);  -- Thief’s Dagger increases Dexterity by 6

INSERT INTO equipment_slot (name) VALUES
-- ('head'),
('chest'),
-- ('legs'),
-- ('feet'),
-- ('hands'),
('weapon');
-- ('shield'),
-- ('ring'),
-- ('amulet');

-- INSERT INTO ability_type (name, "desc") VALUES
-- ('Active', 'Abilities that require activation.'),
-- ('Passive', 'Abilities that provide constant effects.'),
-- ('Spell', 'Magical abilities used in combat.');

-- INSERT INTO ability (name, ability_type_id) VALUES
-- ('Power Strike', 1),
-- ('Fireball', 3),
-- ('Stealth', 2),
-- ('Divine Shield', 1),
-- ('Multi-Shot', 1);

-- INSERT INTO effect_type (name, "desc") VALUES
-- ('buff', 'A temporary benefit to a character’s attributes'),
-- ('debuff', 'A temporary hindrance to a character’s attributes');

-- INSERT INTO status_effect (name, effect_type_id, duration, "desc") VALUES
-- ('Strength Boost', 1, 30, 'Increases strength for a short period.'),
-- ('Poison', 2, 60, 'Deals damage over time.'),
-- ('Haste', 1, 45, 'Increases movement and attack speed.'),
-- ('Slow', 2, 40, 'Reduces movement and attack speed.');

-- INSERT INTO item (item_type_id, name) VALUES
-- (1, 'Iron Sword'),
-- (1, 'Magic Wand'),
-- (2, 'Leather Armor'),
-- (2, 'Steel Shield'),
-- (3, 'Healing Potion');

-- INSERT INTO item_attribute (item_id, attribute_id, value) VALUES
-- (1, 1, 5),  -- Iron Sword increases Strength by 5
-- (2, 3, 8),  -- Magic Wand increases Intelligence by 8
-- (3, 1, 3),  -- Leather Armor increases Strength by 3
-- (4, 2, 2),  -- Steel Shield increases Dexterity by 2
-- (5, 4, 10); -- Healing Potion increases Luck by 10

-- INSERT INTO title (name) VALUES
-- ('Champion'),
-- ('The Wise'),
-- ('Shadow Walker'),
-- ('Defender of Light'),
-- ('Master Archer');

INSERT INTO users (first_name, last_name, email, "password", created_at, updated_at)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2b$10$0AZpuQOj7ATWzZo1s/hIg.UVVPgtTeZPMgjdtsX7z5dGxC2y6tHrO', NOW(), NOW());

INSERT INTO characters (class_id, name, user_id, "money")
VALUES
  (1, 'Aragorn', 1, 10000);

INSERT INTO character_attribute (character_id, attribute_id, value)
VALUES
  (1, 1, 2),
  (1, 2, 4),
  (1, 3, 10),
  (1, 4, 5);

INSERT INTO character_item (character_id, item_id)
VALUES
  (1, 1), -- Aragorn has Iron Sword
  (1, 2), -- Aragorn has Health Potion
  (1, 3); -- Aragorn has Leather Armor

INSERT INTO character_equipment (equipment_slot_id, character_id, item_id)
VALUES
  (2, 1, 1); -- Aragorn equips Iron Sword

