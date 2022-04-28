const fs = require("fs");
const path = require("path");
require("dotenv").config();
//let scriptfile = path.join(__dirname, "fillin.sql");
const { Pool } = require('pg');

async function shit() {
const pool = new Pool(); // will use psql environment variables
console.log("Connected to database");

await pool.query("SET SCHEMA 'ecommerce_db';")
//fs.writeFileSync(scriptfile,"");
//fs.appendFileSync(scriptfile, 'SET SCHEMA ecommerce_db;');
//fs.appendFileSync(scriptfile, 'BEGIN; \n');
let categories = [
  { id: 7, name: "armor", description: "" },
  { id: 6, name: "weapon", description: "" },
  { id: 3, name: "key", description: "" },
  { id: 4, name: "wand", description: "" },
  { id: 5, name: "potion", description: ""},
  { id: 2, name: "rings", description: ""},
  { id: 1, name: "food", description: "" },
  { id: 8, name: "other", description: ""}
];
for (let i = 0; i < categories.length; i++) {
  let curr = categories[i];
  await pool.query(`INSERT INTO item_category (name, description) VALUES ('${curr.name}', '${curr.description}');`);
  //fs.appendFileSync(scriptfile, resultString);
}
//fs.appendFileSync(scriptfile, 'COMMIT; BEGIN; \n');

let games = [{ name: "pixel dungeon" }];
for (let i = 0; i < games.length; i++) {
  let curr = games[i];
  await pool.query(`INSERT INTO game (name) VALUES ('${curr.name}');\n`);
  //fs.appendFileSync(scriptfile, resultString);
}
//fs.appendFileSync(scriptfile, 'COMMIT; BEGIN; \n');

let user_types = [
  {name: "user"},
  {name: "admin"},
  {name: "developer"}
];
for (let i = 0; i < user_types.length; i++) {
  let curr = user_types[i];
  await pool.query(`INSERT INTO user_type (name) VALUES ('${curr.name}');\n`);
  //fs.appendFileSync(scriptfile, resultString);
}
//fs.appendFileSync(scriptfile, 'COMMIT; BEGIN; \n');

let items = [
  {
    class: 6,
    name: "battle axe",
    description:
      "This is a crude and heavy weapon. It''s specifically designed to deal devastating blows to your enemies.",
    imgId: 23,
    tier: 4,
    accuracy: 1.2,
  },
  {
    class: 6,
    name: "dagger",
    description:
      "A well balanced dagger. Sharp and short for dealing fast and effective blows to unsuspecting foes.",
    imgId: 20,
    tier: 1,
    accuracy: 1.2,
    price:10
  },
  {
    class: 6,
    name: "glaive",
    description:
      "A bladed staff weapon. This long weapon is an effective tool for keeping your foes in a distance and deal slashing hits.",
    imgId: 31,
    tier: 5,
    accuracy: 1,
  },
  {
    class: 6,
    name: "brass knuckles",
    description:
      "Piece of metal designed to fit around the fingers and gripped by the hand. Increases your punching power drastically.",
    imgId: 17,
    tier: 1,
    accuracy: 1,
  },
  {
    class: 6,
    name: "longsword",
    description:
      "Widely-used standard straight sword. An accessible sword which inflicts consistent regular damage and high slash damage, making it applicable to a variety of situations.",
    imgId: 21,
    tier: 4,
    accuracy: 1,
  },
  {
    class: 6,
    name: "mace",
    description: "The iron head of this weapon inflicts substantial damage",
    imgId: 19,
    tier: 3,
    accuracy: 1,
  },
  {
    class: 6,
    name: "quarterstaff",
    description: "A staff of hardwood, its ends are shod with iron",
    imgId: 18,
    tier: 2,
    accuracy: 1,
  },
  {
    class: 6,
    name: "shortsword",
    description:
      "It''s indeed quite short, just a few inches longer, than a dagger",
    imgId: 3,
    tier: 1,
    accuracy: 1,
  },
  {
    class: 6,
    name: "spear",
    description: "A slender wooden rod tipped with sharpened iron",
    imgId: 30,
    tier: 2,
    accuracy: 1,
  },
  {
    class: 6,
    name: "greatsword",
    description:
      "Greatswords are powerful blades with a wide swing radius and long reaching attacks, enabling the wielder to target multiple opponents within the radius of the swing motion.",
    imgId: 22,
    tier: 3,
    accuracy: 1,
  },
  {
    class: 6,
    name: "war hammer",
    description:
      "Few creatures can withstand the crushing blow of this towering mass of lead and steel, but only the strongest of adventurers can use it effectively.",
    imgId: 24,
    tier: 5,
    accuracy: 1.2,
  },
  {
    class: 7,
    name: "cloth armor",
    tier: 1,
    description: "This lightweight armor offers basic protection.",
    imgId: 25,
  },
  {
    class: 7,
    name: "leather armor",
    tier: 2,
    description:
      "Armor made from tanned monster hide. Not as light as cloth armor but provides better protection.",
    imgId: 26,
  },
  {
    class: 7,
    name: "mail armor",
    tier: 3,
    description:
      "Interlocking metal links make for a tough but flexible suit of armor.",
    imgId: 27,
  },
  {
    class: 7,
    name: "plate armor",
    tier: 5,
    description:
      "Enormous plates of metal are joined together into a suit that provides unmatched protection to any adventurer strong enough to bear its staggering weight.",
    imgId: 28,
  },
  {
    class: 7,
    name: "scale armor",
    tier: 4,
    description: "The metal scales sewn onto a leather vest create a flexible, yet protective armor.",
    imgId: 29,
  },
  {
    class: 3,
    name: "golden key",
    description: "The notches on this golden key are tiny and intricate. Maybe it can open some chest lock?",
    imgId: 11,
    price: 50
  },
  {
    class: 3,
    name: "iron key",
    description: "This iron key is small and simple. Maybe it can open some door?",
    imgId: 10,
  },
  {
    class: 3,
    name: "skeleton key",
    description: "This key looks serious: its head is shaped like a skull. Probably it can open some serious door.",
    imgId: 9,
  },
  {
    class: 4,
    name: "wand of amok",
    tier: 3,
    description: "The purple light from this wand will make the target run amok attacking random creatures in its vicinity.",
    imgId: 4,
  },
  {
    class: 4,
    name: "wand of avalanche",
    tier: 4,
    description: "When a discharge of this wand hits a wall (or any other solid obstacle) it causes an avalanche of stones, damaging and stunning all creatures in the affected area.",
    imgId: 49,
  },
  {
    class: 4,
    name: "wand of blink",
    tier: 2,
    description: "This wand will allow you to teleport in the chosen direction. Creatures and inanimate obstructions will block the teleportation.",
    imgId: 50,
  },
  {
    class: 4,
    name: "wand of disintegration",
    tier: 4,
    description: "This wand emits a beam of destructive energy, which pierces all creatures in its way. The more targets it hits, the more damage it inflicts to each of them.",
    imgId: 51,
  },
  {
    class: 4,
    name: "wand of firebolt",
    tier: 3,
    description: "This wand unleashes bursts of magical fire. It will ignite flammable terrain, and will damage and burn a creature it hits.",
    imgId: 52,
  },
  {
    class: 4,
    name: "wand of flock",
    tier: 4,
    description: "A flick of this wand summons a flock of magic sheep, creating a temporary impenetrable obstacle.",
    imgId: 53,
  },
  {
    class: 4,
    name: "wand of lightning",
    tier: 5,
    description: "This wand conjures forth deadly arcs of electricity, which deal damage to several creatures standing close to each other.",
    imgId: 54,
  },
  {
    class: 4,
    name: "wand of magic missile",
    tier: 5,
    description: "This wand launches missiles of pure magical energy, dealing moderate damage to a target creature.",
    imgId: 55,
  },
  {
    class: 4,
    name: "wand of poison",
    tier: 5,
    description: "The vile blast of this twisted bit of wood will imbue its target with a deadly venom. A creature that is poisoned will suffer periodic damage until the effect ends. The duration of the effect increases with the level of the staff.",
    imgId: 56,
  },
  {
    class: 4,
    name: "wand of reach",
    tier: 2,
    description: "This utility wand can be used to grab objects from a distance and to switch places with enemies. Waves of magic force radiated from it will affect all cells on their way triggering traps, trampling high vegetation, opening closed doors and closing open ones.",
    imgId: 69,
  },
  {
    class: 4,
    name: "wand of regrowth",
    tier: 4,
    description: "When life ceases new life always begins to grow... The eternal cycle always remains!",
    imgId: 70,
  },
  {
    class: 4,
    name: "wand of slowness",
    tier: 3,
    description: "This wand will cause a creature to move and attack at half its ordinary speed until the effect ends",
    imgId: 71,
  },
  {
    class: 4,
    name: "wand of teleportation",
    tier: 2,
    description: "A blast from this wand will teleport a creature against its will to a random place on the current level.",
    imgId: 72,
  },
  {
    class: 5,
    name: "potion of experience",
    description: "The storied experiences of multitudes of battles reduced to liquid form, this draught will instantly raise your experience level",
    imgId: 57
  },
  {
    class: 5,
    name: "potion of liquid flame",
    description: "This flask contains an unstable compound which will burst violently into flame upon exposure to open air",
    imgId: 58
  },
  {
    class: 5,
    name: "potion of frost",
    description: "Upon exposure to open air, this chemical will evaporate into a freezing cloud, causing any creature that contacts it to be frozen in place",
    imgId: 59
  },
  {
    class: 5,
    name: "potion of healing",
    description: "An elixir that will instantly return you to full health and cure poison",
    imgId: 60
  },
  {
    class: 5,
    name: "potion of might",
    description: "This powerful liquid will course through your muscles, permanently increasing your strenght by one point and health by five",
    imgId: 61
  },
  {
    class: 5,
    name: "potion of mind vision",
    description: "After drinking this, your mind will become attuned to the psychic signature of distant creatures. Enabling you to sense biological presence through walls.",
    imgId: 62
  },
  {
    class: 5,
    name: "potion of paralytic gas",
    description: "Upon exposure to open air, the liquid in this flask will vaporize and instantly paralyze anyone who inhales it. They will be unable to move for sometime.",
    imgId: 66
  },
  {
    class: 5,
    name: "potion of purity",
    description: "This reagent will quickly neutralize all harmful gases in the area of effect. Drinking it will give you temporary immunity to such gases",
    imgId: 64
  },
  {
    class: 5,
    name: "potion of strength",
    description: "This powerful liquid will course through your muscles, permamently increasing your strength by one point",
    imgId: 65
  },
  {
    class: 5,
    name: "potion of toxic gas",
    description: "Shattering this pressurized glass will cause its contents to explode into a deadly cloud of toxic gas. You might want to be careful with this one...",
    imgId: 63
  },
  {
    class: 5,
    name: "potion of invisibility",
    description: "Drinking this potion will render you temporarily invisible. While invisible, enemies will be unable to see you. Attacking will dispel the effect",
    imgId: 68
  },
  {
    class: 5,
    name: "potion of levitation",
    description: "Drinking this curious liquid will cause you to hover in the air, able to drift effortlessly over traps. However, flames and gases fill the air and cannot be bypassed by levitation",
    imgId: 67
  },
  {
    class: 2,
    name: "ring of haste",
    description: "This ring accelerates the wearers flow of time, allowing one to perform all actions a little faster.",
    imgId: 33
  },
  {
    class: 2,
    name: "ring of detection",
    description: "Wearing this ring will allow the wearer to notice hidden secrets, traps and doors.",
    imgId: 34
  },
  {
    class: 2,
    name: "ring of power",
    description: "Your wands will become more powerful in the energy field that radiates from this ring.",
    imgId: 35
  },
  {
    class: 2,
    name: "ring of satiety",
    description: "Wearing this ring you can go without food longer.",
    imgId: 36
  },
  {
    class: 2,
    name: "ring of evasion",
    description: "This ring increases your chance to dodge enemy attack",
    imgId: 37
  },
  {
    class: 2,
    name: "ring of herbalism",
    description: "This ring increases your chance to gather dew and seeds from trampled grass",
    imgId: 38
  },
  {
    class: 2,
    name: "ring of shadows",
    description: "Enemies will be less likely to notice you if you wear this ring.",
    imgId: 39
  },
  {
    class: 2,
    name: "ring of thorns",
    description: "Though this ring doesnt provide real thorns, an enemy that attacks you will itself be wounded by a fraction of the damage that it inflicts",
    imgId: 40
  },
  {
    class: 1,
    name: "chargrilled meat",
    description: "It looks like a decent steak",
    imgId: 122
  },
  {
    class: 1,
    name: "frozen carpaccio",
    description: "Its a piece of frozen raw meat. The only way to eat it is by cutting thin slices of it. This way its surprisingly good!",
    imgId: 117
  },
  {
    class: 1,
    name: "raw meat",
    description: "Eating is raw wouldnt be a good idea, but cooking it could expose some beneficial effects!",
    imgId: 114
  },
  {
    class: 1,
    name: "ivans carbonara",
    description: "Carbonara is https://en.wikipedia.org/wiki/Carbonara",
    imgId: "carbonara"
  },
  {
    class: 1,
    name: "overpriced food ration",
    description: "It looks exactly like a standard ration of food, but smaller and more expensive",
    imgId: 116
  },
  {
    class: 1,
    name: "pastry",
    description: "This is authentic Cornish pasty with traditional filling of beef and potato.",
    imgId: 113
  },
  {
    class: 8,
    name: "torch",
    description: "Its a stick with a oil-dipped cloth wrapped around at the end. Lighting it will help you to see in the dark, light up braziers and burn stumps that may be blocking a path",
    imgId: 85,
    price: 10
  },
  {
    class: 8,
    name: "bag of mysteries",
    description: "Whats in the bag? Could be anything really!",
    imgId: 84,
    price: 75
  },
  {
    class: 8,
    name: "the holy book of pasta",
    description: "In nomine Carbonarus et Bacon et Pastaus sancti.",
    imgId: 83,
    price: 50
  },
  {
    class: 8,
    name: "bubble",
    description: "Its just a regular-ordinary bubble. What? Did you think that our store is only for blades and magical mumbo-jumbo?",
    imgId: 82,
    price: 5
  },
  {
    class: 8,
    name: "cloak of invisibility",
    description: "Upon wearing this cloak you will vanish from the naked eye, but just by vanishing doesnt mean you can escape your problems.",
    imgId: 100
  },
  {
    class: 8,
    name: "chest of microtransactions",
    description: "Just for the price of 150 coins, win the game. BUY NOW! LIMITED TIME ONLY! EXTRA 100000+ GEMS* ON PURCHASE! ONLY COSMETIC UPGRADES*! GRAB YOUR MOMMAS WALLET NOW AND ORDER!!",
    imgId: 106,
    price: 150
  }
];

for (let i = 0; i < items.length; i++) {
  let curr = items[i];
  await pool.query(`INSERT INTO item_inventory (quantity) VALUES (100);`);
  await pool.query(`INSERT INTO item (name, description, category_id, game_id, inventory_id, path_to_image, price) VALUES ('${curr.name}','${curr.description}', ${curr.class}, 1, ${i+1}, '${curr.imgId}', ${curr.price || curr.tier*10 || curr.class*10});\n`);
  //fs.appendFileSync(scriptfile, inventoryString);
  //fs.appendFileSync(scriptfile, resultString);
}
}
shit();
//fs.appendFileSync(scriptfile, 'COMMIT; \n');
// module.exports = { items };
