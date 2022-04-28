--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-04-28 12:08:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 17247)
-- Name: ecommerce_db; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA ecommerce_db;


--
-- TOC entry 210 (class 1259 OID 17248)
-- Name: discount_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.discount_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 17249)
-- Name: discount; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.discount (
    id integer DEFAULT nextval('ecommerce_db.discount_seq'::regclass) NOT NULL,
    name character varying(32) DEFAULT NULL::character varying,
    description text,
    active smallint,
    starts_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    ends_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone
);


--
-- TOC entry 212 (class 1259 OID 17260)
-- Name: game_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.game_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 213 (class 1259 OID 17261)
-- Name: game; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.game (
    id integer DEFAULT nextval('ecommerce_db.game_seq'::regclass) NOT NULL,
    name character varying(32) NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 214 (class 1259 OID 17268)
-- Name: inventory; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.inventory (
    user_id integer NOT NULL,
    item_id integer NOT NULL,
    quantity integer NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 17293)
-- Name: item_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.item_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 220 (class 1259 OID 17294)
-- Name: item; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.item (
    id integer DEFAULT nextval('ecommerce_db.item_seq'::regclass) NOT NULL,
    category_id integer NOT NULL,
    game_id integer NOT NULL,
    inventory_id integer NOT NULL,
    discount_id integer,
    name character varying(32) DEFAULT NULL::character varying,
    description text,
    path_to_image character varying(255) DEFAULT NULL::character varying,
    price integer NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 215 (class 1259 OID 17274)
-- Name: item_category_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.item_category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 216 (class 1259 OID 17275)
-- Name: item_category; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.item_category (
    id integer DEFAULT nextval('ecommerce_db.item_category_seq'::regclass) NOT NULL,
    name character varying(32) NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 217 (class 1259 OID 17284)
-- Name: item_inventory_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.item_inventory_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 218 (class 1259 OID 17285)
-- Name: item_inventory; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.item_inventory (
    id integer DEFAULT nextval('ecommerce_db.item_inventory_seq'::regclass) NOT NULL,
    quantity integer DEFAULT 100 NOT NULL,
    modified_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 227 (class 1259 OID 17379)
-- Name: order_details_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.order_details_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 228 (class 1259 OID 17380)
-- Name: order_details; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.order_details (
    id integer DEFAULT nextval('ecommerce_db.order_details_seq'::regclass) NOT NULL,
    user_id integer NOT NULL,
    total integer NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 229 (class 1259 OID 17393)
-- Name: order_items_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.order_items_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 230 (class 1259 OID 17394)
-- Name: order_items; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.order_items (
    id integer DEFAULT nextval('ecommerce_db.order_items_seq'::regclass) NOT NULL,
    quantity integer NOT NULL,
    item_id integer NOT NULL,
    order_id integer NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 17348)
-- Name: user_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 226 (class 1259 OID 17349)
-- Name: user; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db."user" (
    id integer DEFAULT nextval('ecommerce_db.user_seq'::regclass) NOT NULL,
    email character varying(32) NOT NULL,
    firstname character varying(32) NOT NULL,
    lastname character varying(32) NOT NULL,
    username character varying(32) NOT NULL,
    pswd character varying(255) NOT NULL,
    path_to_logo character varying(32) DEFAULT NULL::character varying,
    payment_id integer,
    usertype_id integer DEFAULT 1 NOT NULL,
    coins integer DEFAULT 200 NOT NULL,
    high_score integer,
    subscribed smallint DEFAULT '1'::smallint NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_chk_1 CHECK ((coins >= 0)),
    CONSTRAINT user_chk_2 CHECK ((high_score >= 0))
);


--
-- TOC entry 221 (class 1259 OID 17330)
-- Name: user_payment_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.user_payment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 222 (class 1259 OID 17331)
-- Name: user_payment; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.user_payment (
    id integer DEFAULT nextval('ecommerce_db.user_payment_seq'::regclass) NOT NULL,
    payment_types character varying(32) DEFAULT NULL::character varying,
    provider character varying(32) DEFAULT NULL::character varying,
    account_number integer,
    expiry character varying(5) DEFAULT NULL::character varying
);


--
-- TOC entry 223 (class 1259 OID 17340)
-- Name: user_type_seq; Type: SEQUENCE; Schema: ecommerce_db; Owner: -
--

CREATE SEQUENCE ecommerce_db.user_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 224 (class 1259 OID 17341)
-- Name: user_type; Type: TABLE; Schema: ecommerce_db; Owner: -
--

CREATE TABLE ecommerce_db.user_type (
    id integer DEFAULT nextval('ecommerce_db.user_type_seq'::regclass) NOT NULL,
    name character varying(32) DEFAULT NULL::character varying
);


--
-- TOC entry 3433 (class 0 OID 17249)
-- Dependencies: 211
-- Data for Name: discount; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.discount (id, name, description, active, starts_at, ends_at) FROM stdin;
\.


--
-- TOC entry 3435 (class 0 OID 17261)
-- Dependencies: 213
-- Data for Name: game; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.game (id, name, created_at) FROM stdin;
1	pixel dungeon	2022-04-28 12:05:53
\.


--
-- TOC entry 3436 (class 0 OID 17268)
-- Dependencies: 214
-- Data for Name: inventory; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.inventory (user_id, item_id, quantity) FROM stdin;
\.


--
-- TOC entry 3442 (class 0 OID 17294)
-- Dependencies: 220
-- Data for Name: item; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.item (id, category_id, game_id, inventory_id, discount_id, name, description, path_to_image, price, created_at, modified_at) FROM stdin;
1	6	1	1	\N	battle axe	This is a crude and heavy weapon. It's specifically designed to deal devastating blows to your enemies.	23	40	2022-04-28 12:05:53	2022-04-28 12:05:53
2	6	1	2	\N	dagger	A well balanced dagger. Sharp and short for dealing fast and effective blows to unsuspecting foes.	20	10	2022-04-28 12:05:53	2022-04-28 12:05:53
3	6	1	3	\N	glaive	A bladed staff weapon. This long weapon is an effective tool for keeping your foes in a distance and deal slashing hits.	31	50	2022-04-28 12:05:53	2022-04-28 12:05:53
4	6	1	4	\N	brass knuckles	Piece of metal designed to fit around the fingers and gripped by the hand. Increases your punching power drastically.	17	10	2022-04-28 12:05:53	2022-04-28 12:05:53
5	6	1	5	\N	longsword	Widely-used standard straight sword. An accessible sword which inflicts consistent regular damage and high slash damage, making it applicable to a variety of situations.	21	40	2022-04-28 12:05:53	2022-04-28 12:05:53
6	6	1	6	\N	mace	The iron head of this weapon inflicts substantial damage	19	30	2022-04-28 12:05:53	2022-04-28 12:05:53
7	6	1	7	\N	quarterstaff	A staff of hardwood, its ends are shod with iron	18	20	2022-04-28 12:05:53	2022-04-28 12:05:53
8	6	1	8	\N	shortsword	It's indeed quite short, just a few inches longer, than a dagger	3	10	2022-04-28 12:05:53	2022-04-28 12:05:53
9	6	1	9	\N	spear	A slender wooden rod tipped with sharpened iron	30	20	2022-04-28 12:05:53	2022-04-28 12:05:53
10	6	1	10	\N	greatsword	Greatswords are powerful blades with a wide swing radius and long reaching attacks, enabling the wielder to target multiple opponents within the radius of the swing motion.	22	30	2022-04-28 12:05:53	2022-04-28 12:05:53
11	6	1	11	\N	war hammer	Few creatures can withstand the crushing blow of this towering mass of lead and steel, but only the strongest of adventurers can use it effectively.	24	50	2022-04-28 12:05:53	2022-04-28 12:05:53
12	7	1	12	\N	cloth armor	This lightweight armor offers basic protection.	25	10	2022-04-28 12:05:53	2022-04-28 12:05:53
13	7	1	13	\N	leather armor	Armor made from tanned monster hide. Not as light as cloth armor but provides better protection.	26	20	2022-04-28 12:05:53	2022-04-28 12:05:53
14	7	1	14	\N	mail armor	Interlocking metal links make for a tough but flexible suit of armor.	27	30	2022-04-28 12:05:53	2022-04-28 12:05:53
15	7	1	15	\N	plate armor	Enormous plates of metal are joined together into a suit that provides unmatched protection to any adventurer strong enough to bear its staggering weight.	28	50	2022-04-28 12:05:53	2022-04-28 12:05:53
16	7	1	16	\N	scale armor	The metal scales sewn onto a leather vest create a flexible, yet protective armor.	29	40	2022-04-28 12:05:53	2022-04-28 12:05:53
17	8	1	17	\N	golden key	The notches on this golden key are tiny and intricate. Maybe it can open some chest lock?	11	50	2022-04-28 12:05:53	2022-04-28 12:05:53
18	8	1	18	\N	iron key	This iron key is small and simple. Maybe it can open some door?	10	30	2022-04-28 12:05:53	2022-04-28 12:05:53
19	8	1	19	\N	skeleton key	This key looks serious: its head is shaped like a skull. Probably it can open some serious door.	9	50	2022-04-28 12:05:53	2022-04-28 12:05:53
20	4	1	20	\N	wand of amok	The purple light from this wand will make the target run amok attacking random creatures in its vicinity.	4	30	2022-04-28 12:05:53	2022-04-28 12:05:53
21	4	1	21	\N	wand of avalanche	When a discharge of this wand hits a wall (or any other solid obstacle) it causes an avalanche of stones, damaging and stunning all creatures in the affected area.	49	40	2022-04-28 12:05:53	2022-04-28 12:05:53
22	4	1	22	\N	wand of blink	This wand will allow you to teleport in the chosen direction. Creatures and inanimate obstructions will block the teleportation.	50	20	2022-04-28 12:05:53	2022-04-28 12:05:53
23	4	1	23	\N	wand of disintegration	This wand emits a beam of destructive energy, which pierces all creatures in its way. The more targets it hits, the more damage it inflicts to each of them.	51	40	2022-04-28 12:05:53	2022-04-28 12:05:53
24	4	1	24	\N	wand of firebolt	This wand unleashes bursts of magical fire. It will ignite flammable terrain, and will damage and burn a creature it hits.	52	30	2022-04-28 12:05:53	2022-04-28 12:05:53
25	4	1	25	\N	wand of flock	A flick of this wand summons a flock of magic sheep, creating a temporary impenetrable obstacle.	53	40	2022-04-28 12:05:53	2022-04-28 12:05:53
26	4	1	26	\N	wand of lightning	This wand conjures forth deadly arcs of electricity, which deal damage to several creatures standing close to each other.	54	50	2022-04-28 12:05:53	2022-04-28 12:05:53
27	4	1	27	\N	wand of magic missile	This wand launches missiles of pure magical energy, dealing moderate damage to a target creature.	55	50	2022-04-28 12:05:53	2022-04-28 12:05:53
28	4	1	28	\N	wand of poison	The vile blast of this twisted bit of wood will imbue its target with a deadly venom. A creature that is poisoned will suffer periodic damage until the effect ends. The duration of the effect increases with the level of the staff.	56	50	2022-04-28 12:05:53	2022-04-28 12:05:53
29	4	1	29	\N	wand of reach	This utility wand can be used to grab objects from a distance and to switch places with enemies. Waves of magic force radiated from it will affect all cells on their way triggering traps, trampling high vegetation, opening closed doors and closing open ones.	69	20	2022-04-28 12:05:53	2022-04-28 12:05:53
30	4	1	30	\N	wand of regrowth	When life ceases new life always begins to grow... The eternal cycle always remains!	70	40	2022-04-28 12:05:53	2022-04-28 12:05:53
31	4	1	31	\N	wand of slowness	This wand will cause a creature to move and attack at half its ordinary speed until the effect ends	71	30	2022-04-28 12:05:53	2022-04-28 12:05:53
32	4	1	32	\N	wand of teleportation	A blast from this wand will teleport a creature against its will to a random place on the current level.	72	20	2022-04-28 12:05:53	2022-04-28 12:05:53
33	5	1	33	\N	potion of experience	The storied experiences of multitudes of battles reduced to liquid form, this draught will instantly raise your experience level	57	50	2022-04-28 12:05:53	2022-04-28 12:05:53
34	5	1	34	\N	potion of liquid flame	This flask contains an unstable compound which will burst violently into flame upon exposure to open air	58	50	2022-04-28 12:05:53	2022-04-28 12:05:53
35	5	1	35	\N	potion of frost	Upon exposure to open air, this chemical will evaporate into a freezing cloud, causing any creature that contacts it to be frozen in place	59	50	2022-04-28 12:05:53	2022-04-28 12:05:53
36	5	1	36	\N	potion of healing	An elixir that will instantly return you to full health and cure poison	60	50	2022-04-28 12:05:53	2022-04-28 12:05:53
37	5	1	37	\N	potion of might	This powerful liquid will course through your muscles, permanently increasing your strenght by one point and health by five	61	50	2022-04-28 12:05:53	2022-04-28 12:05:53
38	5	1	38	\N	potion of mind vision	After drinking this, your mind will become attuned to the psychic signature of distant creatures. Enabling you to sense biological presence through walls.	62	50	2022-04-28 12:05:53	2022-04-28 12:05:53
39	5	1	39	\N	potion of paralytic gas	Upon exposure to open air, the liquid in this flask will vaporize and instantly paralyze anyone who inhales it. They will be unable to move for sometime.	66	50	2022-04-28 12:05:53	2022-04-28 12:05:53
40	5	1	40	\N	potion of purity	This reagent will quickly neutralize all harmful gases in the area of effect. Drinking it will give you temporary immunity to such gases	64	50	2022-04-28 12:05:53	2022-04-28 12:05:53
41	5	1	41	\N	potion of strength	This powerful liquid will course through your muscles, permamently increasing your strength by one point	65	50	2022-04-28 12:05:53	2022-04-28 12:05:53
42	5	1	42	\N	potion of toxic gas	Shattering this pressurized glass will cause its contents to explode into a deadly cloud of toxic gas. You might want to be careful with this one...	63	50	2022-04-28 12:05:53	2022-04-28 12:05:53
43	5	1	43	\N	potion of invisibility	Drinking this potion will render you temporarily invisible. While invisible, enemies will be unable to see you. Attacking will dispel the effect	68	50	2022-04-28 12:05:53	2022-04-28 12:05:53
44	5	1	44	\N	potion of levitation	Drinking this curious liquid will cause you to hover in the air, able to drift effortlessly over traps. However, flames and gases fill the air and cannot be bypassed by levitation	67	50	2022-04-28 12:05:53	2022-04-28 12:05:53
45	2	1	45	\N	ring of haste	This ring accelerates the wearers flow of time, allowing one to perform all actions a little faster.	33	20	2022-04-28 12:05:53	2022-04-28 12:05:53
46	2	1	46	\N	ring of detection	Wearing this ring will allow the wearer to notice hidden secrets, traps and doors.	34	20	2022-04-28 12:05:53	2022-04-28 12:05:53
47	2	1	47	\N	ring of power	Your wands will become more powerful in the energy field that radiates from this ring.	35	20	2022-04-28 12:05:53	2022-04-28 12:05:53
48	2	1	48	\N	ring of satiety	Wearing this ring you can go without food longer.	36	20	2022-04-28 12:05:53	2022-04-28 12:05:53
49	2	1	49	\N	ring of evasion	This ring increases your chance to dodge enemy attack	37	20	2022-04-28 12:05:53	2022-04-28 12:05:53
50	2	1	50	\N	ring of herbalism	This ring increases your chance to gather dew and seeds from trampled grass	38	20	2022-04-28 12:05:53	2022-04-28 12:05:53
51	2	1	51	\N	ring of shadows	Enemies will be less likely to notice you if you wear this ring.	39	20	2022-04-28 12:05:53	2022-04-28 12:05:53
52	2	1	52	\N	ring of thorns	Though this ring doesnt provide real thorns, an enemy that attacks you will itself be wounded by a fraction of the damage that it inflicts	40	20	2022-04-28 12:05:53	2022-04-28 12:05:53
53	1	1	53	\N	chargrilled meat	It looks like a decent steak	122	10	2022-04-28 12:05:53	2022-04-28 12:05:53
54	1	1	54	\N	frozen carpaccio	Its a piece of frozen raw meat. The only way to eat it is by cutting thin slices of it. This way its surprisingly good!	117	10	2022-04-28 12:05:53	2022-04-28 12:05:53
55	1	1	55	\N	raw meat	Eating is raw wouldnt be a good idea, but cooking it could expose some beneficial effects!	114	10	2022-04-28 12:05:53	2022-04-28 12:05:53
56	1	1	56	\N	ivans carbonara	Carbonara is https://en.wikipedia.org/wiki/Carbonara	carbonara	10	2022-04-28 12:05:53	2022-04-28 12:05:53
57	1	1	57	\N	overpriced food ration	It looks exactly like a standard ration of food, but smaller and more expensive	116	10	2022-04-28 12:05:53	2022-04-28 12:05:53
58	1	1	58	\N	pastry	This is authentic Cornish pasty with traditional filling of beef and potato.	113	10	2022-04-28 12:05:53	2022-04-28 12:05:53
59	8	1	59	\N	torch	Its a stick with a oil-dipped cloth wrapped around at the end. Lighting it will help you to see in the dark, light up braziers and burn stumps that may be blocking a path	85	10	2022-04-28 12:05:53	2022-04-28 12:05:53
60	8	1	60	\N	bag of mysteries	Whats in the bag? Could be anything really!	84	75	2022-04-28 12:05:53	2022-04-28 12:05:53
61	8	1	61	\N	the holy book of pasta	In nomine Carbonarus et Bacon et Pastaus sancti.	83	50	2022-04-28 12:05:53	2022-04-28 12:05:53
62	8	1	62	\N	bubble	Its just a regular-ordinary bubble. What? Did you think that our store is only for blades and magical mumbo-jumbo?	82	5	2022-04-28 12:05:53	2022-04-28 12:05:53
63	8	1	63	\N	cloak of invisibility	Upon wearing this cloak you will vanish from the naked eye, but just by vanishing doesnt mean you can escape your problems.	100	80	2022-04-28 12:05:53	2022-04-28 12:05:53
64	8	1	64	\N	chest of microtransactions	Just for the price of 150 coins, win the game. BUY NOW! LIMITED TIME ONLY! EXTRA 100000+ GEMS* ON PURCHASE! ONLY COSMETIC UPGRADES*! GRAB YOUR MOMMAS WALLET NOW AND ORDER!!	106	150	2022-04-28 12:05:53	2022-04-28 12:05:53
\.


--
-- TOC entry 3438 (class 0 OID 17275)
-- Dependencies: 216
-- Data for Name: item_category; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.item_category (id, name, description, created_at) FROM stdin;
1	food		2022-04-28 12:05:53
2	rings		2022-04-28 12:05:53
3	key		2022-04-28 12:05:53
4	wand		2022-04-28 12:05:53
5	potion		2022-04-28 12:05:53
6	weapon		2022-04-28 12:05:53
7	armor		2022-04-28 12:05:53
8	other		2022-04-28 12:05:53
\.


--
-- TOC entry 3440 (class 0 OID 17285)
-- Dependencies: 218
-- Data for Name: item_inventory; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.item_inventory (id, quantity, modified_at) FROM stdin;
1	100	2022-04-28 12:05:53
2	100	2022-04-28 12:05:53
3	100	2022-04-28 12:05:53
4	100	2022-04-28 12:05:53
5	100	2022-04-28 12:05:53
6	100	2022-04-28 12:05:53
7	100	2022-04-28 12:05:53
8	100	2022-04-28 12:05:53
9	100	2022-04-28 12:05:53
10	100	2022-04-28 12:05:53
11	100	2022-04-28 12:05:53
12	100	2022-04-28 12:05:53
13	100	2022-04-28 12:05:53
14	100	2022-04-28 12:05:53
15	100	2022-04-28 12:05:53
16	100	2022-04-28 12:05:53
17	100	2022-04-28 12:05:53
18	100	2022-04-28 12:05:53
19	100	2022-04-28 12:05:53
20	100	2022-04-28 12:05:53
21	100	2022-04-28 12:05:53
22	100	2022-04-28 12:05:53
23	100	2022-04-28 12:05:53
24	100	2022-04-28 12:05:53
25	100	2022-04-28 12:05:53
26	100	2022-04-28 12:05:53
27	100	2022-04-28 12:05:53
28	100	2022-04-28 12:05:53
29	100	2022-04-28 12:05:53
30	100	2022-04-28 12:05:53
31	100	2022-04-28 12:05:53
32	100	2022-04-28 12:05:53
33	100	2022-04-28 12:05:53
34	100	2022-04-28 12:05:53
35	100	2022-04-28 12:05:53
36	100	2022-04-28 12:05:53
37	100	2022-04-28 12:05:53
38	100	2022-04-28 12:05:53
39	100	2022-04-28 12:05:53
40	100	2022-04-28 12:05:53
41	100	2022-04-28 12:05:53
42	100	2022-04-28 12:05:53
43	100	2022-04-28 12:05:53
44	100	2022-04-28 12:05:53
45	100	2022-04-28 12:05:53
46	100	2022-04-28 12:05:53
47	100	2022-04-28 12:05:53
48	100	2022-04-28 12:05:53
49	100	2022-04-28 12:05:53
50	100	2022-04-28 12:05:53
51	100	2022-04-28 12:05:53
52	100	2022-04-28 12:05:53
53	100	2022-04-28 12:05:53
54	100	2022-04-28 12:05:53
55	100	2022-04-28 12:05:53
56	100	2022-04-28 12:05:53
57	100	2022-04-28 12:05:53
58	100	2022-04-28 12:05:53
59	100	2022-04-28 12:05:53
60	100	2022-04-28 12:05:53
61	100	2022-04-28 12:05:53
62	100	2022-04-28 12:05:53
63	100	2022-04-28 12:05:53
64	100	2022-04-28 12:05:53
\.


--
-- TOC entry 3450 (class 0 OID 17380)
-- Dependencies: 228
-- Data for Name: order_details; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.order_details (id, user_id, total, created_at) FROM stdin;
\.


--
-- TOC entry 3452 (class 0 OID 17394)
-- Dependencies: 230
-- Data for Name: order_items; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.order_items (id, quantity, item_id, order_id) FROM stdin;
\.


--
-- TOC entry 3448 (class 0 OID 17349)
-- Dependencies: 226
-- Data for Name: user; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db."user" (id, email, firstname, lastname, username, pswd, path_to_logo, payment_id, usertype_id, coins, high_score, subscribed, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 3444 (class 0 OID 17331)
-- Dependencies: 222
-- Data for Name: user_payment; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.user_payment (id, payment_types, provider, account_number, expiry) FROM stdin;
\.


--
-- TOC entry 3446 (class 0 OID 17341)
-- Dependencies: 224
-- Data for Name: user_type; Type: TABLE DATA; Schema: ecommerce_db; Owner: -
--

COPY ecommerce_db.user_type (id, name) FROM stdin;
1	user
2	admin
3	developer
\.


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 210
-- Name: discount_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.discount_seq', 1, false);


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 212
-- Name: game_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.game_seq', 1, true);


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 215
-- Name: item_category_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.item_category_seq', 8, true);


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 217
-- Name: item_inventory_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.item_inventory_seq', 64, true);


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 219
-- Name: item_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.item_seq', 64, true);


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 227
-- Name: order_details_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.order_details_seq', 1, false);


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 229
-- Name: order_items_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.order_items_seq', 1, false);


--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_payment_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.user_payment_seq', 1, false);


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.user_seq', 1, false);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_type_seq; Type: SEQUENCE SET; Schema: ecommerce_db; Owner: -
--

SELECT pg_catalog.setval('ecommerce_db.user_type_seq', 3, true);


--
-- TOC entry 3249 (class 2606 OID 17259)
-- Name: discount discount_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.discount
    ADD CONSTRAINT discount_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 17364)
-- Name: user email; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db."user"
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3251 (class 2606 OID 17267)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 3253 (class 2606 OID 17272)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (user_id, item_id);


--
-- TOC entry 3256 (class 2606 OID 17283)
-- Name: item_category item_category_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item_category
    ADD CONSTRAINT item_category_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 17292)
-- Name: item_inventory item_inventory_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item_inventory
    ADD CONSTRAINT item_inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 3264 (class 2606 OID 17305)
-- Name: item item_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 17386)
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3283 (class 2606 OID 17399)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 17339)
-- Name: user_payment user_payment_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.user_payment
    ADD CONSTRAINT user_payment_pkey PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 17362)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 17347)
-- Name: user_type user_type_pkey; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 17366)
-- Name: user username; Type: CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db."user"
    ADD CONSTRAINT username UNIQUE (username);


--
-- TOC entry 3259 (class 1259 OID 17326)
-- Name: category_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX category_id ON ecommerce_db.item USING btree (category_id);


--
-- TOC entry 3260 (class 1259 OID 17329)
-- Name: discount_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX discount_id ON ecommerce_db.item USING btree (discount_id);


--
-- TOC entry 3261 (class 1259 OID 17327)
-- Name: game_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX game_id ON ecommerce_db.item USING btree (game_id);


--
-- TOC entry 3262 (class 1259 OID 17328)
-- Name: inventory_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX inventory_id ON ecommerce_db.item USING btree (inventory_id);


--
-- TOC entry 3254 (class 1259 OID 17273)
-- Name: inventory_user_id_item_id_idx; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE UNIQUE INDEX inventory_user_id_item_id_idx ON ecommerce_db.inventory USING btree (user_id, item_id);


--
-- TOC entry 3280 (class 1259 OID 17410)
-- Name: item_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX item_id ON ecommerce_db.order_items USING btree (item_id);


--
-- TOC entry 3281 (class 1259 OID 17411)
-- Name: order_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX order_id ON ecommerce_db.order_items USING btree (order_id);


--
-- TOC entry 3271 (class 1259 OID 17377)
-- Name: payment_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX payment_id ON ecommerce_db."user" USING btree (payment_id);


--
-- TOC entry 3279 (class 1259 OID 17392)
-- Name: user_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX user_id ON ecommerce_db.order_details USING btree (user_id);


--
-- TOC entry 3276 (class 1259 OID 17378)
-- Name: usertype_id; Type: INDEX; Schema: ecommerce_db; Owner: -
--

CREATE INDEX usertype_id ON ecommerce_db."user" USING btree (usertype_id);


--
-- TOC entry 3284 (class 2606 OID 17306)
-- Name: item item_ibfk_1; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item
    ADD CONSTRAINT item_ibfk_1 FOREIGN KEY (category_id) REFERENCES ecommerce_db.item_category(id);


--
-- TOC entry 3285 (class 2606 OID 17311)
-- Name: item item_ibfk_2; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item
    ADD CONSTRAINT item_ibfk_2 FOREIGN KEY (game_id) REFERENCES ecommerce_db.game(id);


--
-- TOC entry 3286 (class 2606 OID 17316)
-- Name: item item_ibfk_3; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item
    ADD CONSTRAINT item_ibfk_3 FOREIGN KEY (inventory_id) REFERENCES ecommerce_db.item_inventory(id);


--
-- TOC entry 3287 (class 2606 OID 17321)
-- Name: item item_ibfk_4; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.item
    ADD CONSTRAINT item_ibfk_4 FOREIGN KEY (discount_id) REFERENCES ecommerce_db.discount(id);


--
-- TOC entry 3290 (class 2606 OID 17387)
-- Name: order_details order_details_ibfk_1; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.order_details
    ADD CONSTRAINT order_details_ibfk_1 FOREIGN KEY (user_id) REFERENCES ecommerce_db."user"(id);


--
-- TOC entry 3291 (class 2606 OID 17400)
-- Name: order_items order_items_ibfk_1; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.order_items
    ADD CONSTRAINT order_items_ibfk_1 FOREIGN KEY (item_id) REFERENCES ecommerce_db.item(id);


--
-- TOC entry 3292 (class 2606 OID 17405)
-- Name: order_items order_items_ibfk_2; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db.order_items
    ADD CONSTRAINT order_items_ibfk_2 FOREIGN KEY (order_id) REFERENCES ecommerce_db.order_details(id);


--
-- TOC entry 3288 (class 2606 OID 17367)
-- Name: user user_ibfk_1; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db."user"
    ADD CONSTRAINT user_ibfk_1 FOREIGN KEY (payment_id) REFERENCES ecommerce_db.user_payment(id);


--
-- TOC entry 3289 (class 2606 OID 17372)
-- Name: user user_ibfk_2; Type: FK CONSTRAINT; Schema: ecommerce_db; Owner: -
--

ALTER TABLE ONLY ecommerce_db."user"
    ADD CONSTRAINT user_ibfk_2 FOREIGN KEY (usertype_id) REFERENCES ecommerce_db.user_type(id);


-- Completed on 2022-04-28 12:08:55

--
-- PostgreSQL database dump complete
--

