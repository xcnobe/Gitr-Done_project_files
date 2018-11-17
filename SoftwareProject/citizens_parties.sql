create table if not exists parties(party varchar(1), description varchar(40), primary key (party) );

insert into parties(name, description) values ('D', 'Democratic Party');
insert into parties(name, description) values ('R', 'Republican Party');
insert into parties(name, description) values ('I', 'Independent');

create table if not exists citizens( SSN serial, name varchar(100) not null, DOB date not null, party varchar(1) REFERENCES parties(party), primary key (SSN) );

insert into citizens (SSN, name, DOB, party) values (123, 'Dennis Rodman', '01/01/2000', 'D');
insert into citizens (SSN, name, DOB, party) values (123, 'Roger Federer', '01/01/2001', 'R');
insert into citizens (SSN, name, DOB, party) values (123, 'John Elway', '01/01/2002', 'D');
insert into citizens (SSN, name, DOB, party) values (123, 'Barack Obama', '01/01/2003', 'I');
insert into citizens (SSN, name, DOB, party) values (123, 'Clint Eastwood', '01/01/2004', 'I');
insert into citizens (SSN, name, DOB, party) values (123, 'Mohandas Gandhi', '01/01/2005', 'R');
insert into citizens (SSN, name, DOB, party) values (123, 'Robert Downey', '01/01/2006', 'D');