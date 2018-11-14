create table if not exists users( id serial, firstname varchar(40), lastname varchar(40), email varchar(100) not null, pw varchar(100) not null, primary key (id) );

insert into users (firstname, lastname, email, pw) values ('Jack', 'Marty', 'jama2828@colorado.edu', '1234');

create table if not exists events ( eventid serial, userid integer not null, name varchar(100) not null,  location varchar(100) not null, eventdate date not null, starttime time not null, endtime time not null, primary key (eventid) );

insert into events (userid, name, location, eventdate, starttime, endtime) values ('1', 'Football Game', 'Boulder', '2018-11-14', '12:00:00', '13:00:00');