CREATE DATABASE latech;
use latech;

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY auto_increment,
logradouro VARCHAR(45),
bairro VARCHAR(30),
numero VARCHAR(10),
complemento VARCHAR(10),
cep CHAR(9)
);

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY auto_increment,
nome VARCHAR(45),
cnpj CHAR(18),
tel VARCHAR(20),
email VARCHAR(30),
senha VARCHAR(30),
fkEndEmpresa INT,
	CONSTRAINT fkEndEmp foreign key (fkEndEmpresa)
		REFERENCES endereco(idEndereco)
);

CREATE TABLE usuario (
idUsuario INT auto_increment,
login VARCHAR(20),
senha CHAR(13),
fkEmpUsuario INT,
	CONSTRAINT fkEmpUsu FOREIGN KEY (fkEmpUsuario)
		REFERENCES empresa(idEmpresa),
fkResponsavel INT,
	CONSTRAINT pkLider FOREIGN KEY (fkResponsavel)
		REFERENCES usuario(idUsuario),
	CONSTRAINT pkComposta PRIMARY KEY (idUsuario, fkEmpUsuario)
);


CREATE TABLE tipoProduto (
idTipoProduto INT PRIMARY KEY auto_increment,
tipo VARCHAR(20),
subtipo VARCHAR(15),
validade DATE
);


CREATE TABLE armazem (
idArmazem INT PRIMARY KEY auto_increment,
fkEndArmazem INT,
	CONSTRAINT fkEndA foreign key (fkEndArmazem)
		REFERENCES endereco(idEndereco),
fkEmpresa INT,
	CONSTRAINT fkEmp foreign key (fkEmpresa)
		REFERENCES empresa(idEmpresa),
fkTipoProduto INT,
	CONSTRAINT fkProduto FOREIGN KEY (fkTipoProduto)
		REFERENCES tipoProduto(idTipoProduto)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY auto_increment,
nomeSensor VARCHAR(10),
tipoSensor VARCHAR(10),
situacaoSensor CHAR(1), constraint chkSituacao
	check (situacaoSensor in ('A', 'I')),
fkArmazem INT,
	CONSTRAINT fkArm foreign key (fkArmazem)
		REFERENCES armazem(idArmazem)
);

CREATE TABLE metricas (
idMetricas INT auto_increment,
minimoTemp FLOAT,
minimoUmid FLOAT,
maximoTemp FLOAT,
maximoUmid FLOAT,
fkSensorIdeal INT,
	CONSTRAINT fkSens FOREIGN KEY (fkSensorIdeal)
		REFERENCES sensor(idSensor),
	CONSTRAINT pkSensor PRIMARY KEY (idMetricas, fkSensorIdeal),
	CONSTRAINT unqSensor UNIQUE (fkSensorIdeal)
);

CREATE TABLE metricaHistorico (
idMetricaHistorico INT auto_increment,
dataHora DATETIME,
umidade INT,
temperatura INT,
fkMetricaIdeal INT,
	CONSTRAINT fkIdeal FOREIGN KEY (fkMetricaIdeal)
		REFERENCES metricas(idMetricas),
fkSensor INT,
	CONSTRAINT fkSensorHist FOREIGN KEY (fkSensor)
		REFERENCES sensor(idSensor),
	CONSTRAINT pkSenHist PRIMARY KEY (idMetricaHistorico, fkSensor)
);

-- Inserido endereços que sera usado na tabela empresa e na tabela armazém
INSERT INTO endereco VALUES
(NULL, 'Av Nova Cantareira', 'Tucuruvi', '262', 'Sl32', '02340-000'),
(NULL, 'Rua das Fiandeiras', 'Vila Olímpia', '170', NULL, '04545-005'),
(NULL, 'Rua Pereira Estéfano', 'Vila da Saúde', '1029', 'Sl53', '04144-070'),
(NULL, 'Rua Soldado Hilário Decimo Zanesco', 'Parque Novo Mundo', '2067', NULL, '02189-040'),
(NULL, 'Praça Ribeira das Naus', 'Jardim São José', '123', 'Térreo', '02969-160'),
(NULL, 'Praça Hélio Smidt', 'Chácara Monte Alegre', '937', NULL, '04647-020'),
(NULL, 'Rua Doutor Rafael Parisi', 'Americanópolis', '222', '3Andar', '04410-110'),
(NULL, 'Rua Forte William', 'Morumbi', '5986', NULL, '05704-110'),
(NULL, 'Rua Antônio Miranda', 'Jardim Ana Lúcia', '1211', '11Andar', '04812-050'),
(NULL, 'Rua Lauro de Freitas', 'Vila Sílvia', '7789', NULL, '03820-270');
desc endereco;
INSERT INTO endereco VALUES
	(NULL, 'Rua Das Esperanças', 'Sapopemba', '989', NULL, '09060-030');
select * from endereco;
INSERT INTO empresa VALUES
(NULL, 'Italac', '01.257.995/0032-30', '2546-9877', 'interno@italac.com', 1),
(NULL, 'Longa Vida', '01.979.512/0054-16', '2546-9877', 'responsavel.dist@longavida.com', 2),
(NULL, 'Paulista', '09.569.987/0001-09', '2546-9877', 'svdc@paulista.com', 3),
(NULL, 'Dália', '87.121.254/0001-91', '2546-9877', 'interno@dalia.com', 4),
(NULL, 'Santa Claa', '56.001.145/0001-13', '2546-9877', 'respinterno@coopsantaclara.com', 5);
desc empresa;


-- Inserindo o usuário lider, que é o responsável pela equipe
INSERT INTO usuario VALUES
(NULL, 'resp.italac', '!1234567', 1, NULL),
(NULL, 'prim.lvida', '!1234567', 2, NULL),
(NULL, 'prim.paulista', '!1234567', 3, NULL),
(NULL, 'prim.dalia', '!1234567', 4, NULL),
(NULL, 'sc.primar', '!1234567', 5, NULL);


-- Inserindo os usuarios secundários, os que possuem líderes

INSERT INTO usuario VALUES
(NULL, 'sec.italac', '1234567!', 1, 1),
(NULL, 'terc.italac', '$1234567', 1, 1),
(NULL, 'sec.lvida', '1234567!', 2, 2),
(NULL, 'terc.lvida', '$1234567', 2, 2),
(NULL, 'sec.paulista', '1234567!', 3, 3),
(NULL, 'terc.paulista', '$1234567', 3, 3),
(NULL, 'sec.dalia', '1234567!', 4, 4),
(NULL, 'terc.dalia', '$1234567', 4, 4),
(NULL, 'sc.sec', '1234567!', 5, 5),
(NULL, 'sc.terc', '$1234567', 5, 5);

INSERT INTO tipoProduto VALUES
(NULL, 'vaca', 'Integral', '2023-05-23'),
(NULL, 'vaca', 'Desnatado', '2023-05-23'),
(NULL, 'vaca', 'semiDesnatado', '2023-05-23');

desc armazem;
INSERT INTO armazem VALUES
  (NULL, 6, 1, 1),
  (NULL, 7, 2, 1),
  (NULL, 8, 3, 1),
  (NULL, 9, 4, 1),
  (NULL, 10, 5, 1);
select * from armazem;
INSERT INTO armazem VALUES
	(NULL, 11, 1, 1);
desc sensor;
INSERT INTO sensor VALUES
(NULL, 'DHT11', 'Temp/Hum', 'A', 1),
(NULL, 'DHT11', 'Temp/Hum', 'A', 1),
(NULL, 'DHT11', 'Temp/Hum', 'A', 1),
(NULL, 'DHT11', 'Temp/Hum', 'A', 2),
(NULL, 'DHT11', 'Temp/Hum', 'A', 3),
(NULL, 'DHT11', 'Temp/Hum', 'A', 3),
(NULL, 'DHT11', 'Temp/Hum', 'A', 4),
(NULL, 'DHT11', 'Temp/Hum', 'A', 4),
(NULL, 'DHT11', 'Temp/Hum', 'A', 4),
(NULL, 'DHT11', 'Temp/Hum', 'A', 5),
(NULL, 'DHT11', 'Temp/Hum', 'I', NULL),
(NULL, 'DHT11', 'Temp/Hum', 'I', NULL),
(NULL, 'DHT11', 'Temp/Hum', 'I', NULL),
(NULL, 'DHT11', 'Temp/Hum', 'I', NULL); 
select * from sensor;
-- Inserido as métricas ideais de cada sensor/armazem
INSERT INTO metricas VALUES
(NULL, '4', '45', '7', '65', 1),
(NULL, '4', '45', '7', '65', 2);




INSERT INTO metricaHistorico VALUES
(NULL, '2023-05-02 09:59:59' , 50, 5, 1, 1),
(NULL, '2023-05-02 10:30:59' , 49, 4, 1, 2),
(NULL, '2023-05-02 11:00:00' , 55, 4, 1, 3),
(NULL, '2023-05-02 09:59:59' , 49, 4, 1, 4),
(NULL, '2023-05-02 10:30:59' , 50, 5, 1, 5),
(NULL, '2023-05-02 11:00:00' , 48, 7, 1, 6),
(NULL, '2023-05-02 09:59:59' , 50, 5, 1, 7),
(NULL, '2023-05-02 09:59:59' , 45, 7, 1, 8),
(NULL, '2023-05-02 10:30:59' , 50, 5, 1, 9),
(NULL, '2023-05-02 11:00:00' , 52, 5, 1, 10);

-- Select para ver todos os usuarios de uma empresa em especifico
select * from empresa join usuario
	on idEmpresa = fkEmpUsuario where empresa.razaoSocial = 'Italac';
    
    -- select para mostrar todos os dados de uma empresa em especifico e todos os seus respectivos armazens
select * from empresa join armazem
	on idEmpresa = fkEmpresa join
		sensor on idSensor = fkArmazem where empresa.idEmpresa = 1;
        
-- select para verificar o status de um sensor de uma determinada empresa
select
empresa.razaoSocial as nomeEmpresa,
armazem.idArmazem,
sensor.idSensor,
sensor.situacaoSensor
	from sensor join armazem on idArmazem = fkArmazem
    join empresa on idEmpresa = fkArmazem where fkArmazem = 4;