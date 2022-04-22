const fs = require("fs");
const path = require("path");
let scriptfile = path.join(__dirname, "fillin.sql");

fs.writeFileSync(scriptfile,"");
let categories = [
  { id: 1, name: "armor", description: "" },
  { id: 2, name: "weapon", description: "" },
  { id: 3, name: "key", description: "" },
  { id: 4, name: "wand", description: "" },
  { id: 5, name: "potion", description: ""},
  { id: 6, name: "other", description: ""}
];
for (let i = 0; i < categories.length; i++) {
  let curr = categories[i];
  let resultString = `INSERT INTO item_category (name, description) VALUES ("${curr.name}", "${curr.description}");\n`;
  fs.appendFileSync(scriptfile, resultString);
}

let games = [{ name: "pixel dungeon" }];
for (let i = 0; i < games.length; i++) {
  let curr = games[i];
  let resultString = `INSERT INTO game (name) VALUES ("${curr.name}");\n`;
  fs.appendFileSync(scriptfile, resultString);
}

let user_types = [
  {name: "user"},
  {name: "admin"},
  {name: "developer"}
];
for (let i = 0; i < user_types.length; i++) {
  let curr = user_types[i];
  let resultString = `INSERT INTO user_type (name) VALUES ("${curr.name}");\n`;
  fs.appendFileSync(scriptfile, resultString);
}

let items = [
  {
    class: 2,
    name: "battle axe",
    description:
      "This is a crude and heavy weapon. It's specifically designed to deal devastating blows to your enemies.",
    imgId: 23,
    tier: 4,
    accuracy: 1.2,
  },
  {
    class: 2,
    name: "dagger",
    description:
      "A well balanced dagger. Sharp and short for dealing fast and effective blows to unsuspecting foes.",
    imgId: 20,
    tier: 1,
    accuracy: 1.2,
  },
  {
    class: 2,
    name: "glaive",
    description:
      "A bladed staff weapon. This long weapon is an effective tool for keeping your foes in a distance and deal slashing hits.",
    imgId: 31,
    tier: 5,
    accuracy: 1,
  },
  {
    class: 2,
    name: "brass knuckles",
    description:
      "Piece of metal designed to fit around the fingers and gripped by the hand. Increases your punching power drastically.",
    imgId: 17,
    tier: 1,
    accuracy: 1,
  },
  {
    class: 2,
    name: "longsword",
    description:
      "Widely-used standard straight sword. An accessible sword which inflicts consistent regular damage and high slash damage, making it applicable to a variety of situations.",
    imgId: 21,
    tier: 4,
    accuracy: 1,
  },
  {
    class: 2,
    name: "mace",
    description: "The iron head of this weapon inflicts substantial damage",
    imgId: 19,
    tier: 3,
    accuracy: 1,
  },
  {
    class: 2,
    name: "quarterstaff",
    description: "A staff of hardwood, its ends are shod with iron",
    imgId: 16,
    tier: 2,
    accuracy: 1,
  },
  {
    class: 2,
    name: "shortsword",
    description:
      "It's indeed quite short, just a few inches longer, than a dagger",
    imgId: 3,
    tier: 1,
    accuracy: 1,
  },
  {
    class: 2,
    name: "spear",
    description: "A slender wooden rod tipped with sharpened iron",
    imgId: 30,
    tier: 2,
    accuracy: 1,
  },
  {
    class: 2,
    name: "greatsword",
    description:
      "Greatswords are powerful blades with a wide swing radius and long reaching attacks, enabling the wielder to target multiple opponents within the radius of the swing motion.",
    imgId: 22,
    tier: 3,
    accuracy: 1,
  },
  {
    class: 2,
    name: "war hammer",
    description:
      "Few creatures can withstand the crushing blow of this towering mass of lead and steel, but only the strongest of adventurers can use it effectively.",
    imgId: 24,
    tier: 5,
    accuracy: 1.2,
  },
  {
    class: 1,
    name: "cloth armor",
    tier: 1,
    description: "This lightweight armor offers basic protection.",
    imgId: 25,
  },
  {
    class: 1,
    name: "leather armor",
    tier: 2,
    description:
      "Armor made from tanned monster hide. Not as light as cloth armor but provides better protection.",
    imgId: 26,
  },
  {
    class: 1,
    name: "mail armor",
    tier: 3,
    description:
      "Interlocking metal links make for a tough but flexible suit of armor.",
    imgId: 27,
  },
  {
    class: 1,
    name: "plate armor",
    tier: 5,
    description:
      "Enormous plates of metal are joined together into a suit that provides unmatched protection to any adventurer strong enough to bear its staggering weight.",
    imgId: 28,
  },
  {
    class: 1,
    name: "scale armor",
    tier: 4,
    description:
      "The metal scales sewn onto a leather vest create a flexible, yet protective armor.",
    imgId: 29,
  },
  {
    class: 3,
    name: "golden key",
    description:
      "The notches on this golden key are tiny and intricate. Maybe it can open some chest lock?",
    imgId: 11,
  },
  {
    class: 3,
    name: "iron key",
    description:
      "This iron key is small and simple. Maybe it can open some door?",
    imgId: 10,
  },
  {
    class: 3,
    name: "skeleton key",
    description:
      "This key looks serious: its head is shaped like a skull. Probably it can open some serious door.",
    imgId: 9,
  },
  {
    class: 4,
    name: "wand of amok",
    description:
      "The purple light from this wand will make the target run amok attacking random creatures in its vicinity.",
    imgId: 4,
  },
  {
    class: 4,
    name: "wand of avalanche",
    description:
      "When a discharge of this wand hits a wall (or any other solid obstacle) it causes an avalanche of stones, damaging and stunning all creatures in the affected area.",
    imgId: 49,
  },
  {
    class: 4,
    name: "wand of blink",
    description:
      "This wand will allow you to teleport in the chosen direction. Creatures and inanimate obstructions will block the teleportation.",
    imgId: 50,
  },
  {
    class: 4,
    name: "wand of disintegration",
    description:
      "This wand emits a beam of destructive energy, which pierces all creatures in its way. The more targets it hits, the more damage it inflicts to each of them.",
    imgId: 51,
  },
  {
    class: 4,
    name: "wand of firebolt",
    description:
      "This wand unleashes bursts of magical fire. It will ignite flammable terrain, and will damage and burn a creature it hits.",
    imgId: 52,
  },
  {
    class: 4,
    name: "wand of flock",
    description:
      "A flick of this wand summons a flock of magic sheep, creating a temporary impenetrable obstacle.",
    imgId: 53,
  },
  {
    class: 4,
    name: "wand of lightning",
    description:
      "This wand conjures forth deadly arcs of electricity, which deal damage to several creatures standing close to each other.",
    imgId: 54,
  },
  {
    class: 4,
    name: "wand of magic missile",
    description:
      "This wand launches missiles of pure magical energy, dealing moderate damage to a target creature.",
    imgId: 55,
  },
  {
    class: 4,
    name: "wand of poison",
    description:
      "The vile blast of this twisted bit of wood will imbue its target with a deadly venom. A creature that is poisoned will suffer periodic damage until the effect ends. The duration of the effect increases with the level of the staff.",
    imgId: 56,
  },
  {
    class: 4,
    name: "wand of reach",
    description:
      "This utility wand can be used to grab objects from a distance and to switch places with enemies. Waves of magic force radiated from it will affect all cells on their way triggering traps, trampling high vegetation, opening closed doors and closing open ones.",
    imgId: 69,
  },
  {
    class: 4,
    name: "wand of regrowth",
    description:
      '"When life ceases new life always begins to grow... The eternal cycle always remains!"',
    imgId: 70,
  },
  {
    class: 4,
    name: "wand of slowness",
    description:
      "This wand will cause a creature to move and attack at half its ordinary speed until the effect ends",
    imgId: 71,
  },
  {
    class: 4,
    name: "wand of teleportation",
    description:
      "A blast from this wand will teleport a creature against its will to a random place on the current level.",
    imgId: 72,
  },
];

for (let i = 0; i < items.length; i++) {
  let curr = items[i];
  var inventoryString = `INSERT INTO item_inventory (quantity) VALUES (100);\n`;
  let resultString = `INSERT INTO item (name, description, category_id, game_id, inventory_id, path_to_image, price) VALUES ("${curr.name}","${curr.description}", ${curr.class}, 1, ${i+1}, ${curr.imgId}, ${curr.tier*10 || curr.class*10});\n`;
  fs.appendFileSync(scriptfile, inventoryString);
  fs.appendFileSync(scriptfile, resultString);
}

module.exports = { items };
