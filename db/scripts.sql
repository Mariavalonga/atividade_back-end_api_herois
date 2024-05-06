CREATE DATABASE atividade_api_herois;

\c atividade_api_herois;


CREATE TABLE herois (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    poder VARCHAR(50) NOT NULL,
    nivel INTEGER NOT NULL,
    hp INTEGER NOT NULL
    
);

INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Hulk', 'Super Força', 100, 1000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Capitão América', 'Resistência', 900, 9000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Viuva Negra', 'Resistente a dor', 200, 4000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem de Ferro', 'Durabilidade Humana', 700, 3000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Thor', 'Controle de Temperatura', 800, 1000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Batman', 'Rico', 900, 2000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Mulher Maravilha', 'Agilidade sobre-humana', 400, 5000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Superman', 'Voar', 500, 5000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Lanterna Verde', 'Imaginação', 600, 4000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Flash', 'Velocidade', 200, 7000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Doutor Estranho', 'Telepatia', 500, 2020);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Spiderman', 'Soltar Teia', 800, 4000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Capitã Marvel', 'Habilidades psíquicas', 300, 2000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Capitão América', 'Resistência', 900, 9000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Falcão Negro', 'Conexão telepática com seu pássaro Asa Vermelha', 200, 3000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Feiticeira Escarlate', 'Magia do Caos', 900, 4040);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem Formiga', 'Alterar seu tamanho', 200, 5050);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Pantera Negra', 'Habilidades de uma Pantera', 200, 6060);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Mulher Gato', 'Reflexos', 400, 5000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Visão', 'Mudar de forma', 600, 7080);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Wolverine', 'Fator de cura e garras retráteis', 940, 10000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Gavião Arqueiro', 'Precisão com arco e flecha', 880, 7000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Mercúrio', 'Super velocidade', 900, 7500);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Vampira', 'Absorção de poderes e força sobre-humana', 910, 8500);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Senhor das Estrelas', 'Piloto habilidoso e estrategista', 890, 8000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Gamora', 'Mestre em combate corpo a corpo', 920, 9000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Drax, o Destruidor', 'Força sobre-humana e resistência', 930, 9500);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem de Gelo', 'Manipulação do gelo', 870, 7000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Mercúrio', 'Super velocidade', 890, 8000);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Máquina de Combate', 'Armadura de combate avançada', 900, 8500);


CREATE TABLE batalhas (
    id SERIAL PRIMARY KEY,
    heroi1_id INTEGER NOT NULL,
    heroi2_id INTEGER NOT NULL,
    vencedor_id INTEGER NOT NULL
);



