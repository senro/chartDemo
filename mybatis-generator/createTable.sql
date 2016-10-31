-- create table muser(
-- id varchar2(36) primary key,
-- name varchar2(36),
-- age number(8),
-- address varchar2(36)
-- );

create table muser(
id varchar(36) primary key,
name varchar(36),
age int,
address varchar(36)
) charset utf8 collate utf8_general_ci;

-- 用户表
create table users(
id int primary key auto_increment,
name varchar(50),
email varchar(50),
password varchar(50),
roleId int,
createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

-- 角色表
create table roles(
id int primary key auto_increment,
roleName varchar(50),
privilegeIds varchar(50),
createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

-- 权限表
create table privileges(
id int primary key auto_increment,
privilegeName varchar(50),
createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

-- 数据表
create table data(
id int primary key auto_increment,
userId int(50),
hospitalName varchar(50),
month varchar(30),
dataUrl varchar(100),
dataPath varchar(100),
createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

-- 文件上传记录表
create table files(
id int primary key auto_increment,
fileKey varchar(100),
fileUrl varchar(100),
filePath varchar(100),
createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

-- 药品数据表
create table drugRecords(
id int primary key auto_increment,
userId int(50),
hospitalName varchar(50),
drugName varchar(50),
drugSpec varchar(50),
drugUnit varchar(50),
drugFactory varchar(100),
drugType varchar(30),
sale varchar(30),
price VARCHAR(30),
isValid varchar(30),
month varchar(30),
createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

-- 指数记录表
create table priceIndex(
id int primary key auto_increment,
month int(50),
season int(50),
year int(50),
west_month varchar(50),
west_season varchar(50),
west_year varchar(50),
east_month varchar(50),
east_season varchar(50),
east_year varchar(50),
year_top10_price varchar(50),
year_top10_sale varchar(50),
data_total varchar(50),

createAt VARCHAR(30),
updateAt VARCHAR(30)
) charset utf8 collate utf8_general_ci;

INSERT INTO `users`( `name`, `email`, `password`, `roleId`) VALUES ('superDevAdmin','passtome@foxmail.com','abc111111','1');
-- ALTER TABLE users MODIFY createAt VARCHAR(30);
-- ALTER TABLE users MODIFY updateAt VARCHAR(30);
--
-- ALTER TABLE roles MODIFY createAt VARCHAR(30);
-- ALTER TABLE roles MODIFY updateAt VARCHAR(30);
--
-- ALTER TABLE privileges MODIFY createAt VARCHAR(30);
-- ALTER TABLE privileges MODIFY updateAt VARCHAR(30);

-- alter table users modify id int auto_increment;
-- alter table roles modify id int auto_increment;
-- alter table privileges modify id int auto_increment;