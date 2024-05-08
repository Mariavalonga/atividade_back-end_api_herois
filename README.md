OBJETIVO :

 O objetivo é criar uma API que permita realizar operações CRUD (Create, Read, Update, Delete) para manipular informações sobre heróis, além de oferecer funcionalidades adicionais, como batalhas entre heróis e registro de histórico de batalhas.

Funcionalidades Esperadas:

CRUD de Heróis:
Criação de novos heróis com nome, poder, nível e pontos de vida (HP).
Recuperação de todos os heróis cadastrados.
Atualização das informações de um herói existente.
Exclusão de um herói do sistema.
Filtro por nome herói
Batalhas entre Heróis:
Implementação de uma rota que permita simular uma batalha entre dois heróis.
A lógica de batalha deve estar dentro da rota.
O resultado da batalha deve ser registrado no banco de dados.
Filtro batalha por nome de herói.
Histórico de Batalhas:
Criação de uma rota para consultar o histórico de todas as batalhas registradas.
Outra rota para obter o histórico de batalhas com os dados dos heróis envolvidos.

Neste código contém:
Um CRUD completo de heróis, podendo criar, buscar, editar e excluir heróis, e tem um método que você pode buscar o herói por ID. E um filtro para buscar herói pelo poder.

tem uma tabela de Batalhas e você pode batalhar os heróis e descobrir quem venceu.

