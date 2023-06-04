CREATE DATABASE latech;
use latech;

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY auto_increment,
nome VARCHAR(45),
cnpj CHAR(18),
tel VARCHAR(20),
email VARCHAR(30)
);


CREATE TABLE usuario (
idUsuario INT auto_increment,
username VARCHAR(50),
senha CHAR(13),
fkEmpUsuario INT,
	CONSTRAINT fkEmpUsu FOREIGN KEY (fkEmpUsuario)
		REFERENCES empresa(idEmpresa),
fkResponsavel INT,
	CONSTRAINT pkLider FOREIGN KEY (fkResponsavel)
		REFERENCES usuario(idUsuario),
	CONSTRAINT pkComposta PRIMARY KEY (idUsuario, fkEmpUsuario)
);

CREATE TABLE armazem (
idArmazem INT PRIMARY KEY auto_increment,
identificacao varchar(45),
fkEmpresa INT,
	CONSTRAINT fkEmp foreign key (fkEmpresa)
		REFERENCES empresa(idEmpresa)
);

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY auto_increment,
logradouro VARCHAR(45),
bairro VARCHAR(30),
numero VARCHAR(10),
complemento VARCHAR(10),
cep CHAR(9),
fkArmazem int,
fkEmpresa int,
	constraint fkEndArm foreign key(fkArmazem) 
		references armazem(idArmazem),
	constraint fkEndEmp foreign key(fkEmpresa)	
		references empresa(idEmpresa)
);



CREATE TABLE tipoProduto (
idTipoProduto INT PRIMARY KEY auto_increment,
tipo VARCHAR(20),
subtipo VARCHAR(15)
);


CREATE TABLE produtoArmazem (
validade DATE,
idProdArm int,
fkTipoProduto int,
fkArmazem int,
	constraint fkTipoAssoc foreign key (fkTipoProduto)
		references tipoProduto(idTipoProduto),
	constraint fkArmazenAssoc foreign key (fkArmazem)
		references armazem(idArmazem),
    constraint pkTripla primary key (idProdArm, fkTipoProduto, fkArmazem)
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

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45),
    CONSTRAINT tipochk CHECK (tipo IN ('temperatura' , 'umidade')),
    nivel VARCHAR(45),
    CONSTRAINT nivelchk CHECK (nivel IN ('baixa' , 'alta', 'quente', 'frio')),
    dataAlerta DATETIME,
    visto BOOLEAN,
    medida FLOAT,
    fkSensorAlerta INT,
    CONSTRAINT fkAlertaSensor FOREIGN KEY (fkSensorAlerta)
        REFERENCES sensor (idSensor)
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

INSERT INTO empresa VALUES
(NULL, 'Italac', '01.257.995/0032-30', '2546-9877', 'interno@italac.com'),
(NULL, 'Longa Vida', '01.979.512/0054-16', '2546-9877', 'responsavel.dist@longavida.com'),
(NULL, 'Paulista', '09.569.987/0001-09', '2546-9877', 'svdc@paulista.com'),
(NULL, 'Dália', '87.121.254/0001-91', '2546-9877', 'interno@dalia.com'),
(NULL, 'Santa Claa', '56.001.145/0001-13', '2546-9877', 'respinterno@coopsantaclara.com'),
(null, 'Empresa 1', '01.234.567/8901-23', '1234567890', 'empresa1@example.com'),
(null, 'Empresa 2', '12.345.678/9012-34', '2345678901', 'empresa2@example.com'),
(null, 'Empresa 3', '23.456.789/0123-45', '3456789012', 'empresa3@example.com'),
(null, 'Empresa 4', '34.567.890/1234-56', '4567890123', 'empresa4@example.com'),
(null, 'Empresa 5', '45.678.901/2345-67', '5678901234', 'empresa5@example.com'),
(null, 'Empresa 6', '56.789.012/3456-78', '6789012345', 'empresa6@example.com'),
(null, 'Empresa 7', '67.890.123/4567-89', '7890123456', 'empresa7@example.com'),
(null, 'Empresa 8', '78.901.234/5678-90', '8901234567', 'empresa8@example.com'),
(null, 'Empresa 9', '89.012.345/6789-01', '9012345678', 'empresa9@example.com'),
(null, 'Empresa 10', '90.123.456/7890-12', '0123456789', 'empresa10@example.com'),
(null, 'Empresa 11', '01.234.567/8901-23', '1234567890', 'empresa11@example.com'),
(null, 'Empresa 12', '12.345.678/9012-34', '2345678901', 'empresa12@example.com'),
(null, 'Empresa 13', '23.456.789/0123-45', '3456789012', 'empresa13@example.com'),
(null, 'Empresa 14', '34.567.890/1234-56', '4567890123', 'empresa14@example.com'),
(null, 'Empresa 15', '45.678.901/2345-67', '5678901234', 'empresa15@example.com'),
(null, 'Empresa 16', '56.789.012/3456-78', '6789012345', 'empresa16@example.com'),
(null, 'Empresa 17', '67.890.123/4567-89', '7890123456', 'empresa17@example.com'),
(null, 'Empresa 18', '78.901.234/5678-90', '8901234567', 'empresa18@example.com'),
(null, 'Empresa 19', '89.012.345/6789-01', '9012345678', 'empresa19@example.com'),
(null, 'Empresa 20', '90.123.456/7890-12', '0123456789', 'empresa20@example.com');

INSERT INTO usuario VALUES
(NULL, 'resp.italac', '!111111111111', 1, NULL),
(NULL, 'prim.lvida', '!222222222222', 2, NULL),
(NULL, 'prim.paulista', '!333333333333', 3, NULL),
(NULL, 'prim.dalia', '!444444444444', 4, NULL),
(NULL, 'sc.primar', '!555555555555', 5, NULL);


-- Inserindo os usuarios secundários, os que possuem líderes

INSERT INTO usuario VALUES
(NULL, 'sec.italac', '5R7bF8N3t9W2E', 1, 1),
(NULL, 'terc.italac', 'X2sG6H1k4P9Y3', 1, 1),
(NULL, 'sec.lvida', 'J9mN1i6O4qT7L', 2, 2),
(NULL, 'terc.lvida', 'A3cV7x8bK2o5P', 2, 2),
(NULL, 'sec.paulista', 'H5tY9sR7wX1Z2', 3, 3),
(NULL, 'terc.paulista', 'D8fG4h2J6vN5M', 3, 3),
(NULL, 'sec.dalia', 'B6nY2j7K4lT8U', 4, 4),
(NULL, 'terc.dalia', 'Q1wE4rT9yU3I7', 4, 4),
(NULL, 'sc.sec', 'Z5xV7mB2nC3d4', 5, 5),
(NULL, 'sc.terc', 'F2gH5jK8lP6O', 5, 5);


INSERT INTO armazem VALUES
  (NULL, 'Principal', 3),
  (NULL, 'Secundario', 2),
  (NULL, 'Galpão', 2),
  (NULL, 'Estoque', 3),
  (NULL, 'Barracão', 3),
  (NULL, 'Galpao 1', 1),
  (NULL, 'Galpao Maior', 1),
  (NULL, 'Hangar 4', 1),
  (NULL, 'Principal 9', 1),
  (null, 'Armazem 1', 1),
  (null, 'Armazem 2', 17),
  (null, 'Armazem 3', 8),
  (null, 'Armazem 4', 1),
  (null, 'Armazem 5', 3),
  (null, 'Armazem 6', 6),
  (null, 'Armazem 7', 12),
  (null, 'Armazem 8', 1),
  (null, 'Armazem 9', 5),
  (null, 'Armazem 10', 20),
  (null, 'Armazem 11', 1),
  (null, 'Armazem 12', 9),
  (null, 'Armazem 13', 16),
  (null, 'Armazem 14', 1),
  (null, 'Armazem 15', 7),
  (null, 'Armazem 16', 11),
  (null, 'Armazem 17', 1),
  (null, 'Armazem 18', 4),
  (null, 'Armazem 19', 22),
  (null, 'Armazem 20', 1);
  
desc endereco;
-- INSERINDO ENDERECOS NOS ARMAZENS --
INSERT INTO endereco VALUES
(NULL, 'Av Nova Cantareira', 'Tucuruvi', '262', 'Sl32', '02340-000', 1, null),
(NULL, 'Rua das Fiandeiras', 'Vila Olímpia', '170', NULL, '04545-005', 2, null),
(NULL, 'Rua Pereira Estéfano', 'Vila da Saúde', '1029', 'Sl53', '04144-070', 3, null),
(NULL, 'Rua Soldado Hilário Decimo Zanesco', 'Parque Novo Mundo', '2067', NULL, '02189-040', 4, null),
(NULL, 'Praça Ribeira das Naus', 'Jardim São José', '123', 'Térreo', '02969-160', 5, null),
(NULL, 'Praça Hélio Smidt', 'Chácara Monte Alegre', '937', NULL, '04647-020', 6, null),
(NULL, 'Rua Doutor Rafael Parisi', 'Americanópolis', '222', '3Andar', '04410-110', 7, null),
(NULL, 'Rua Forte William', 'Morumbi', '5986', NULL, '05704-110', 8, null),
(NULL, 'Rua Antônio Miranda', 'Jardim Ana Lúcia', '1211', '11Andar', '04812-050', 9, null),
(NULL, 'Rua Lauro de Freitas', 'Vila Sílvia', '7789', NULL, '03820-270', 10, null),
(NULL, 'Rua dos Mangues', 'Vila Humaita', '7389', NULL, '03820-270', 11, null),
(NULL, 'Rua Julia', 'Vila Pires', '7381', NULL, '03820-270', 12, null),
(NULL, 'Rua Pedregulho', 'Vila Formosa', '7381', NULL, '03820-270', 13, null),
(NULL, 'Rua dos Ipês', 'Vila Esperança', '989', NULL, '09060-030', 14, null),
(NULL, 'Avenida das Magnólias', 'Parque dos Pássaros', '989', NULL, '09060-030', 15, null),
(NULL, 'Travessa dos Lírios', 'Centro Histórico', '989', NULL, '09060-030', 16, null),
(NULL, 'Praça dos Girassóis', 'Cidade Nova', '989', NULL, '09060-030', 17, null),
(NULL, 'Alameda das Orquídeas', 'Vila Primavera', '989', NULL, '09060-030', 18, null),
(NULL, 'Avenida das Palmeiras', 'Jardim Bela Vista', '989', NULL, '09060-030', 19, null),
(NULL, 'Praça das Azaleias', 'Bairro Novo', '989', NULL, '09060-030', 20, null),
(NULL, 'Rua das Cerejeiras', 'Vila dos Ipês', '989', NULL, '09060-030', 21, null),
(NULL, 'Travessa dos Jasmim', 'Jardim das Oliveiras', '989', NULL, '09060-030', 22, null),
(NULL, 'Praça das Bromélias', 'Loteamento São Francisco', '989', NULL, '09060-030', 23, null),
(NULL, 'Alameda dos Lírios Brancos', 'Vila São João', '989', NULL, '09060-030', 24, null),
(NULL, 'Rua dos Amores', 'Sapopemba', '989', NULL, '09060-030', 25, null),
(NULL, 'Rua Incrivel', 'Sapopemba', '989', NULL, '09060-030', 26, null),
(NULL, 'Rua General da mortes', 'Sapopemba', '989', NULL, '09060-030', 27, null),
(NULL, 'Rua das Abelhas', 'Sapopemba', '989', NULL, '09060-030', 28, null);

-- INSERINDO ENDERECOS NAS EMPRESAS --
insert into endereco values 
(null,'Rua das Flores', 'Jardim das Acácias', '123', 'Apto 4', '12345-678', null, 1),
(null,'Avenida dos Pássaros', 'Vila Esperança', '456', null, '98765-432', null, 2),
(null,'Travessa das Acácias', 'Parque dos Pássaros', '789', 'Sala 2', '54321-876', null, 3),
(null,'Praça das Rosas', 'Centro Histórico', '1010', null, '45678-901', null, 4),
(null,'Alameda das Oliveiras', 'Cidade Nova', '111', 'Loja A', '89012-345', null, 5),
(null,'Rua dos Ipês', 'Vila Primavera', '222', null, '23456-789', null, 6),
(null,'Avenida das Magnólias', 'Jardim Bela Vista', '333', 'Casa 5', '56789-012', null, 7),
(null,'Travessa dos Lírios', 'Bairro Novo', '444', null, '90123-456', null, 8),
(null,'Praça dos Girassóis', 'Parque das Flores', '555', 'Sala 1', '34567-890', null, 9),
(null,'Alameda das Orquídeas', 'Vila dos Ipês', '666', null, '67890-123', null, 10),
(null,'Rua dos Coqueiros', 'Jardim das Acácias', '777', null, '43210-987', null, 11),
(null,'Avenida das Palmeiras', 'Vila Esperança', '888', null, '87654-321', null, 12),
(null,'Travessa das Seringueiras', 'Parque dos Pássaros', '999', 'Apto 7', '21098-765', null, 13),
(null,'Praça das Azaleias', 'Centro Histórico', '1212', null, '65432-109', null, 14),
(null,'Alameda dos Flamboyants', 'Cidade Nova', '1313', 'Sala 3', '09876-543', null, 15),
(null,'Rua das Cerejeiras', 'Vila Primavera', '1414', null, '32109-876', null, 16),
(null,'Avenida das Hortênsias', 'Jardim Bela Vista', '1515', null, '76543-210', null, 17),
(null,'Travessa dos Jasmim', 'Bairro Novo', '1616', 'Casa 2', '21098-765', null, 18),
(null,'Praça das Bromélias', 'Parque das Flores', '1717', null, '54321-098', null, 19),
(null,'Alameda dos Lírios Brancos', 'Vila dos Ipês', '1818', null, '87654-321', null, 20),
(null,'Rua do Sol', 'Jardim das Acácias', '1920', 'Apto 10', '12345-678', null, 21),
(null,'Avenida da Lua', 'Vila Esperança', '2122', null, '98765-432', null, 22),
(null,'Travessa das Estrelas', 'Parque dos Pássaros', '2324', 'Sala 5', '54321-876', null, 23),
(null,'Praça da Terra', 'Centro Histórico', '2526', null, '45678-901', null, 24),
(null,'Alameda do Mar', 'Cidade Nova', '2728', 'Loja B', '89012-345', null, 25);

INSERT INTO tipoProduto VALUES
(NULL, 'vaca', 'Integral'),
(NULL, 'vaca', 'Desnatado'),
(NULL, 'vaca', 'semidesnatado');

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

-- Inserido as métricas ideais de cada sensor/armazem
INSERT INTO metricas VALUES
(NULL, '4.0', '45.0', '7', '65', 1),
(NULL, '4', '45.0', '7', '65', 2);

desc metricaHistorico;
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

desc alerta;
insert into alerta values
(null, 'temperatura', 'quente','2023-01-01 00:00:00',false, null, 1),
(null, 'temperatura', 'frio','2023-01-02 08:30:00',false, null, 1),
(null, 'temperatura', 'quente','2023-01-05 14:15:00',false, null, 1),
(null, 'temperatura', 'quente','2023-01-08 10:00:00',false, null, 1),
(null, 'temperatura', 'frio','2023-01-12 18:45:00',false, null, 1),
(null, 'temperatura', 'frio', '2023-01-15 09:30:00',false, null, 1),
(null, 'temperatura', 'frio','2023-01-18 12:00:00',false, null, 1),
(null, 'temperatura', 'quente','2023-01-20 16:20:00',false, null, 1),
(null, 'temperatura', 'quente','2023-01-24 11:30:00',false, null, 1),
(null, 'temperatura', 'quente','2023-01-26 17:45:00',false, null, 2),
(null, 'umidade', 'baixa','2023-01-29 14:00:00',false, null, 3),
(null, 'umidade', 'alta','2023-02-02 09:15:00',false, null, 3),
(null, 'umidade', 'baixa','2023-02-05 13:30:00',false, null, 3),
(null, 'umidade', 'baixa','2023-02-08 19:00:00',false, null, 1),
(null, 'umidade', 'baixa','2023-02-10 10:45:00',false, null, 1),
(null, 'umidade', 'alta','2023-02-14 15:20:00',false, null, 1),
(null, 'umidade', 'alta','2023-02-17 08:00:00',false, null, 2),
(null, 'umidade', 'alta','2023-02-20 11:30:00',false, null, 2),
(null, 'umidade', 'baixa','2023-02-23 17:15:00',false, null, 2),
(null, 'umidade', 'alta','2023-02-26 12:45:00',false, null, 2),
(null, 'umidade', 'alta','2023-02-26 12:45:00',false, null, 2),
(null, 'temperatura', 'frio','2023-05-01 00:00:00',false, null, 1),
(null, 'temperatura', 'quente','2023-05-02 08:30:00',false, null, 1),
(null, 'temperatura', 'quente','2023-05-05 14:15:00', false, null, 1);

desc alerta;
-- SELECT GRÁFICO PIE --
SELECT 
    SUM(alerta.tipo = 'temperatura') AS alertaTemp,
    SUM(alerta.tipo = 'umidade') AS alertaUmidade
FROM
    alerta
        JOIN
    sensor ON alerta.fkSensorAlerta = sensor.idSensor
        JOIN
    armazem ON armazem.idArmazem = sensor.fkArmazem
        JOIN
    empresa ON armazem.fkEmpresa = empresa.idEmpresa
WHERE
    armazem.idArmazem = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 8 WEEK);

                
-- ALERTAS EMITIDOS NO MÊS --
SELECT 
    COUNT(idAlerta) AS registros
FROM
    alerta
        JOIN
    sensor ON alerta.fkSensorAlerta = sensor.idSensor
        JOIN
    armazem ON armazem.idArmazem = sensor.fkArmazem
WHERE
    armazem.idArmazem = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH);


-- Alertas das últimas semanas -- 
	

SELECT 
    DATE_FORMAT(dataAlerta, '%Y-%m') AS Ano_Mês,
    COUNT(idAlerta) AS registros
FROM
    alerta
        JOIN
    sensor ON alerta.fkSensorAlerta = sensor.idSensor
        JOIN
    armazem ON armazem.idArmazem = sensor.fkArmazem
WHERE
    armazem.idArmazem = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 4 MONTH)
GROUP BY DATE_FORMAT(alerta.dataAlerta, '%Y-%m');
    
-- NÍVEIS DE UMIDADE NO ARMAZEM REGISTRADO NAS ULTIMAS 6 HORAS --
SELECT 
    DATE_FORMAT(dataAlerta, '%H:%i') AS Horas,
    SUM(alerta.tipo = 'umidade') AS Registros
FROM
    alerta
        JOIN
    sensor ON alerta.fkSensorAlerta = sensor.idSensor
        JOIN
    armazem ON armazem.idArmazem = sensor.fkArmazem
WHERE
    armazem.idArmazem = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 6 HOUR)
GROUP BY DATE_FORMAT(alerta.dataAlerta, '%H:%i');
    
-- NÍVEIS DE TEMPERATURA NO ARMAZEM REGISTRADO NAS ULTIMAS 6 HORAS --
SELECT 
    DATE_FORMAT(dataAlerta, '%H:%i') AS Horas,
    SUM(alerta.tipo = 'temperatura') AS Registros
FROM
    alerta
        JOIN
    sensor ON alerta.fkSensorAlerta = sensor.idSensor
        JOIN
    armazem ON armazem.idArmazem = sensor.fkArmazem
WHERE
    armazem.idArmazem = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 6 HOUR)
GROUP BY DATE_FORMAT(alerta.dataAlerta, '%H:%i');


-- Select para ver todos os usuarios de uma empresa em especifico
SELECT 
    *
FROM
    empresa
        JOIN
    usuario ON idEmpresa = fkEmpUsuario
WHERE
    empresa.nome = 'Italac';
    
    -- select para mostrar todos os dados de uma empresa em especifico e todos os seus respectivos armazens
SELECT 
    *
FROM
    empresa
        JOIN
    armazem ON idEmpresa = fkEmpresa
        JOIN
    sensor ON idSensor = fkArmazem
WHERE
    empresa.idEmpresa = 1;
        
-- select para verificar o status de um sensor de uma determinada empresa
SELECT 
    empresa.nome AS nomeEmpresa,
    armazem.idArmazem,
    sensor.idSensor,
    sensor.situacaoSensor
FROM
    sensor
        JOIN
    armazem ON idArmazem = fkArmazem
        JOIN
    empresa ON idEmpresa = fkArmazem
WHERE
    fkArmazem = 4;
    
-- script para testar a api (o mesmo que está sendo usado nela)
SELECT 
    temperatura AS temperatura,
    umidade AS umidade,
    DATE_FORMAT(dataHora, '%H:%i') AS dataHora_grafico,
    fkArmazem
FROM
    metricaHistorico mh
        JOIN
    sensor s ON mh.fkSensor = s.idSensor
        JOIN
    armazem a ON s.fkArmazem = a.idArmazem
WHERE
    s.fkArmazem = 1 AND a.fkEmpresa = 1
ORDER BY idMetricaHistorico DESC
LIMIT 1;
    
-- select das ocorrencias no ultimo mês
SELECT 
    tipo, COUNT(idAlerta) AS registros
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    MONTH(dataAlerta) >= MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))
        AND idEmpresa = 1
GROUP BY tipo;

-- select das ocorrencias no penultimo mês
SELECT 
    tipo, COUNT(idAlerta) AS registros
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    MONTH(dataAlerta) <= MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))
        AND dataAlerta >= MONTH(DATE_SUB(NOW(), INTERVAL 2 MONTH))
        AND idEmpresa = 1
GROUP BY tipo;

-- select das ocorrencias no antepenultimo mês
SELECT 
    tipo, COUNT(idAlerta) AS registros
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    MONTH(dataAlerta) <= MONTH(DATE_SUB(NOW(), INTERVAL 2 MONTH))
        AND dataAlerta >= MONTH(DATE_SUB(NOW(), INTERVAL 3 MONTH))
        AND idEmpresa = 1
GROUP BY tipo;

-- select das ocorrencias no quarto antepenultimo mês
SELECT 
    tipo, COUNT(idAlerta) AS registros
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    MONTH(dataAlerta) <= MONTH(DATE_SUB(NOW(), INTERVAL 3 MONTH))
        AND dataAlerta >= MONTH(DATE_SUB(NOW(), INTERVAL 4 MONTH))
        AND idEmpresa = 1
GROUP BY tipo;

-- quantidade de alertas por armazem
SELECT 
    idArmazem, COUNT(idAlerta) AS qtd_alertas
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    idEmpresa = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY idArmazem
ORDER BY qtd_alertas DESC;

-- armazem com maior quantidade de alertas
SELECT 
    idArmazem, COUNT(idAlerta) AS qtd_alertas
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    idEmpresa = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY idArmazem
ORDER BY qtd_alertas DESC
LIMIT 1;

-- quantidade de alertas emitidos no últimos mês (geral)
SELECT 
    COUNT(idAlerta) AS qtd_alertas
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    idEmpresa = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
    
-- quantidade de alertas emitidos no último mês (armazem)
SELECT 
    COUNT(idAlerta) AS qtd_alertas
FROM
    alerta
        JOIN
    sensor ON fkSensorAlerta = idSensor
        JOIN
    armazem ON fkArmazem = idArmazem
        JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    idEmpresa = 1 AND idArmazem = 1
        AND dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH);

UPDATE alerta 
SET 
    visto = TRUE
WHERE
    idAlerta = 1;
SELECT 
    *
FROM
    alerta;
    
    SELECT
  Month(dataAlerta) as MesAlerta,
  alerta.tipo,
  alerta.nivel,
  date_format(alerta.dataAlerta, "%H:%i") as HorarioAlerta,
  date_format(alerta.dataAlerta, "%M") as MesDoAlerta,
  alerta.medida as Medida
FROM
  alerta
  join sensor on alerta.fkSensorAlerta = sensor.idSensor
  join armazem on armazem.idArmazem = sensor.fkArmazem
  join empresa on armazem.fkEmpresa = empresa.idEmpresa
  where empresa.idEmpresa = 1 and
  dataAlerta >= DATE_SUB(now(), INTERVAL 1 MONTH) and alerta.tipo = "umidade"
  ORDER BY HorarioAlerta ASC
  LIMIT 10;

-- SELECT DINÂMICO PARA UMIDADE
SELECT 
	mh.dataHora,
    mh.umidade,
    minimoUmid,
    maximoUmid
FROM 
	metricaHistorico mh
JOIN sensor s ON mh.fkSensor = s.idSensor
JOIN metricas m ON mh.fkMetricaIdeal = m.idMetricas
JOIN armazem arm ON s.fkArmazem = arm.idArmazem
JOIN empresa emp ON arm.fkEmpresa = emp.idEmpresa
WHERE
	idEmpresa = 1 AND
    idArmazem = 1
ORDER BY dataHora DESC;