-- Drops

drop table if exists "Video" cascade;
drop table if exists "Party" cascade;
drop table if exists "ListingCoordinates" cascade;
drop table if exists "Listing" cascade;
drop table if exists "User" cascade;

-- Creates

create table "Party" (
	party_id bigserial,
    party_slug varchar(255) unique not null,
    party_channel_youtubeId varchar(255) unique not null,
    party_title varchar(255) unique not null,
    party_sigla varchar(255) unique not null,
    party_lider varchar(255),
    party_description text,
    created_at timestamp default now(),
    updated_at timestamp default now(),

    primary key(party_id)
);

create table "Video" (
    video_id bigserial,
    party_id integer references "Party"(party_id) not null,
    video_slug varchar(255) unique not null,
	video_youtubeId varchar(255) unique not null,
    video_title varchar(255) not null,
    video_description varchar(255),
    video_likeCount integer default 0,
    video_dislikeCount integer default 0,
    video_viewCount integer default 0,
    video_favoriteCount integer default 0,
    video_commentCount integer default 0,
    created_at timestamp default now(),
    updated_at timestamp default now(),

    primary key(video_id)
);

create table "User" (
   id                bigserial      not null,
   username          varchar(255)   not null unique,
   email             varchar(255)   not null unique,
   first_name        varchar(255),
   last_name         varchar(255),
   bio               text,
   phone             varchar(255),
   password          varchar(255),
   profile_picture   varchar(255),
   verified          boolean        not null default false,
   created_at        timestamp      not null default now(),
   updated_at        timestamp      not null default now(),

   primary key(id)
);

create table "Listing" (
   id             bigserial      not null,
   user_id        integer        not null references "User"(id) on delete cascade,
   slug           varchar(255)   not null unique,
   title          varchar(255)   not null,
   description    text,
   price          integer,
   currency       varchar(255),
   phone          varchar(255),
   email          varchar(255),
   created_at     timestamp      not null default now(),
   updated_at     timestamp      not null default now(),

   primary key(id)
);

create table "ListingCoordinates" (
   listing_id     integer        not null references "Listing"(id) on delete cascade,
   lat            float          not null,
   lng            float          not null,

   primary key(listing_id, lat, lng)
);

-- Indexes
create index on "User"(username);
create index on "Listing"(slug);
create index on "ListingCoordinates"(lat);
create index on "ListingCoordinates"(lng);

-- Inserts

insert into "User"(user_id, user_username, user_email, user_password) values
(1, 'username', 'username@example.com', 'password123');

insert into "Listing"(listing_id, listing_slug, listing_title) values
(1, 'listing-1', 'Listing 1'),
(2, 'listing-2', 'Listing 2'),
(3, 'listing-3', 'Listing 3');

insert into "ListingCoordinates"(listing_id, lat, lng) values
(1, 41.166824, -8.663053),
(1, 41.166443, -8.664104),
(1, 41.166925, -8.664399),
(1, 41.167111, -8.663842),
(1, 41.167721, -8.664260),
(1, 41.167959, -8.663772),
(1, 41.167361, -8.663311),
(1, 41.166832, -8.663064),
(2, 41.170764, -8.664812),
(2, 41.170806, -8.665343),
(2, 41.170253, -8.665392),
(2, 41.170180, -8.664839),
(3, 41.160764, -8.664812),
(3, 41.160806, -8.665343),
(3, 41.160253, -8.665392),
(3, 41.160180, -8.664839); 