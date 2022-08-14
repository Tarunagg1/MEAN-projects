create table
    user(
        id int primary key auto_increment,
        name varchar(255) not null,
        contactNumber varchar(255) not null,
        email varchar(50),
        password varchar(50),
        status varchar(50),
        role varchar(50),
        UNIQUE (email)
)

create table categories(
    id int NOT NULL auto_increment,
    name varchar(255) not null,
    primary key (id)}
)


create table products(
    id int NOT NULL auto_increment,
    name varchar(255) not null,
    categoryid integer not null,
    price integer not null,
    description varchar(255),
    status varchar(20),
    primary key (id)
)


create table bills(
    id int NOT NULL auto_increment,
    uuid varchar(255) not null,
    name varchar(255) not null,
    email varchar(255) not null,
    contact varchar(50) not null,
    paymentMethod varchar(50) not null,
    total int not null,
    productsDetails JSON DEFAULT NULL,
    createdBy varchar(255) not null,
    primary key (id)
)
