-- Seed adapted questions for atypical students (autism, ADHD, dyslexia, etc.)

-- Mathematics - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Soma Visual com Blocos', 'Matemática', 'Álgebra', 'Fácil', 'Observe a imagem: 🟦🟦🟦 + 🟦🟦 = ? Quantos blocos azuis temos no total?', '["5 blocos", "6 blocos", "4 blocos", "7 blocos"]', '5 blocos', 'Contando os blocos: 3 blocos + 2 blocos = 5 blocos. Use objetos reais para praticar!'),

('Equação com Desenhos', 'Matemática', 'Álgebra', 'Médio', 'Se 🍎 + 🍎 + 🍎 = 15, quanto vale cada 🍎?', '["5", "3", "15", "45"]', '5', 'Três maçãs somam 15. Dividindo 15 por 3, cada maçã vale 5. Pratique com objetos reais!'),

('Padrões Visuais', 'Matemática', 'Álgebra', 'Fácil', 'Complete o padrão: 2, 4, 6, 8, __', '["10", "9", "12", "7"]', '10', 'O padrão aumenta de 2 em 2. Depois do 8 vem o 10. Use uma régua ou linha numérica para visualizar!'),

('Geometria Tátil', 'Matemática', 'Geometria', 'Fácil', 'Um quadrado tem quantos lados?', '["4 lados", "3 lados", "5 lados", "6 lados"]', '4 lados', 'Desenhe um quadrado ou use um objeto quadrado para contar os lados. Todos os lados são iguais!'),

('Formas no Dia a Dia', 'Matemática', 'Geometria', 'Fácil', 'Qual forma tem uma pizza inteira?', '["Círculo", "Quadrado", "Triângulo", "Retângulo"]', 'Círculo', 'A pizza é redonda, como um círculo! Procure outros objetos circulares ao seu redor.'),

('Área com Quadradinhos', 'Matemática', 'Geometria', 'Médio', 'Conte os quadradinhos: ⬜⬜⬜ (linha 1) ⬜⬜⬜ (linha 2). Quantos quadradinhos no total?', '["6", "3", "9", "4"]', '6', 'Conte linha por linha: 3 + 3 = 6. Use papel quadriculado para praticar!');

-- Portuguese - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Identificar Vogais', 'Português', 'Gramática', 'Fácil', 'Qual letra é uma vogal? A - E - I - O - U', '["A", "B", "C", "D"]', 'A', 'As vogais são: A, E, I, O, U. A letra A é uma vogal! Cante a música das vogais para memorizar.'),

('Substantivo Visual', 'Português', 'Gramática', 'Fácil', 'Qual palavra nomeia um objeto que você pode tocar? 🐕', '["Cachorro", "Correr", "Bonito", "Rapidamente"]', 'Cachorro', 'Cachorro é um substantivo - nomeia um animal que você pode ver e tocar. Substantivos são nomes de coisas!'),

('Verbo em Ação', 'Português', 'Gramática', 'Médio', 'Qual palavra indica uma ação? "O menino PULA corda"', '["Pula", "Menino", "Corda", "O"]', 'Pula', 'PULA é um verbo - indica a ação que o menino está fazendo. Faça o movimento de pular para lembrar!'),

('Rima Simples', 'Português', 'Literatura', 'Fácil', 'Qual palavra rima com GATO?', '["Pato", "Casa", "Bola", "Carro"]', 'Pato', 'GATO e PATO terminam com o mesmo som: -ATO. Isso é uma rima! Pratique com outras palavras.'),

('Ordem Alfabética', 'Português', 'Gramática', 'Médio', 'Coloque em ordem alfabética: BOLA, AVIÃO, CASA', '["AVIÃO, BOLA, CASA", "BOLA, CASA, AVIÃO", "CASA, BOLA, AVIÃO", "AVIÃO, CASA, BOLA"]', 'AVIÃO, BOLA, CASA', 'Olhe a primeira letra: A vem antes de B, B vem antes de C. Use o alfabeto visual como apoio!'),

('Plural Visual', 'Português', 'Gramática', 'Fácil', 'Se 1 = 🐱 (gato), então 3 = ?', '["Gatos", "Gato", "Gatinho", "Gatão"]', 'Gatos', 'Quando temos mais de um, usamos o plural: gato → gatos. Adicione S no final!');

-- History - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Linha do Tempo Visual', 'História', 'História do Brasil', 'Fácil', 'O que aconteceu PRIMEIRO? 1500 (Descobrimento) ou 1822 (Independência)?', '["1500 - Descobrimento", "1822 - Independência", "Aconteceram juntos", "Não sei"]', '1500 - Descobrimento', 'Na linha do tempo, 1500 vem antes de 1822. O Brasil foi descoberto primeiro, depois ficou independente. Use uma linha do tempo visual!'),

('Símbolos Nacionais', 'História', 'História do Brasil', 'Fácil', 'Qual é a bandeira do Brasil? 🟢🟡🔵', '["Verde, amarelo e azul", "Vermelho e branco", "Azul e branco", "Preto e amarelo"]', 'Verde, amarelo e azul', 'Nossa bandeira tem verde (natureza), amarelo (ouro), azul (céu) e branco (paz). Desenhe a bandeira para memorizar!'),

('Causa e Efeito', 'História', 'História do Brasil', 'Médio', 'O que aconteceu DEPOIS da chegada dos portugueses em 1500?', '["Começou a colonização", "Brasil ficou independente", "Proclamação da República", "Nada mudou"]', 'Começou a colonização', 'Primeiro os portugueses chegaram (1500), DEPOIS começou a colonização. Use setas para mostrar a ordem dos eventos!'),

('Personagens Históricos', 'História', 'História do Brasil', 'Fácil', 'Quem disse "Independência ou Morte"?', '["Dom Pedro I", "Getúlio Vargas", "Tiradentes", "Dom João VI"]', 'Dom Pedro I', 'Dom Pedro I proclamou a independência em 1822. Veja imagens dele para memorizar!');

-- Geography - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Mapa Visual do Brasil', 'Geografia', 'Geografia Física', 'Fácil', 'Qual é a cor do Brasil no mapa? 🗺️', '["Verde (florestas)", "Azul (oceano)", "Amarelo (deserto)", "Branco (gelo)"]', 'Verde (florestas)', 'O Brasil tem muitas florestas, por isso aparece verde nos mapas. Observe um mapa colorido!'),

('Pontos Cardeais', 'Geografia', 'Geografia Física', 'Médio', 'Se o Sol nasce pela manhã, ele está no:', '["Leste", "Oeste", "Norte", "Sul"]', 'Leste', 'O Sol sempre nasce no Leste. Use seus braços: direita = Leste (Sol nasce), esquerda = Oeste (Sol se põe)'),

('Clima e Roupa', 'Geografia', 'Geografia Física', 'Fácil', 'Que roupa usar em um lugar FRIO? ❄️', '["Casaco", "Shorts", "Camiseta", "Chinelo"]', 'Casaco', 'Em lugares frios usamos casaco para nos aquecer. Relacione clima com roupas do seu dia a dia!'),

('Estados do Brasil', 'Geografia', 'Geografia Humana', 'Médio', 'Qual é o maior estado do Brasil?', '["Amazonas", "São Paulo", "Rio de Janeiro", "Bahia"]', 'Amazonas', 'O Amazonas é o maior estado em tamanho. Veja no mapa - ele ocupa muito espaço! Use um quebra-cabeça do mapa do Brasil.');

-- Physics - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Movimento Observável', 'Física', 'Mecânica', 'Fácil', 'O que se move mais RÁPIDO?', '["Avião ✈️", "Bicicleta 🚲", "Pessoa andando 🚶", "Tartaruga 🐢"]', 'Avião ✈️', 'O avião é o mais rápido! Ordene objetos do mais lento ao mais rápido. Faça uma corrida para entender velocidade!'),

('Força no Dia a Dia', 'Física', 'Mecânica', 'Fácil', 'O que acontece quando você EMPURRA uma bola?', '["Ela se move", "Ela para", "Ela desaparece", "Nada acontece"]', 'Ela se move', 'Quando empurramos (aplicamos força), a bola se move! Experimente com uma bola real.'),

('Gravidade Simples', 'Física', 'Mecânica', 'Médio', 'Se você soltar um objeto, o que acontece?', '["Cai para baixo", "Sobe para cima", "Fica parado no ar", "Desaparece"]', 'Cai para baixo', 'A gravidade puxa tudo para baixo! Solte objetos diferentes e observe. Todos caem!'),

('Luz e Sombra', 'Física', 'Mecânica', 'Fácil', 'Quando você fica na frente da luz, o que aparece atrás de você?', '["Sombra", "Arco-íris", "Nada", "Outra pessoa"]', 'Sombra', 'Seu corpo bloqueia a luz e cria uma sombra! Brinque com lanternas para ver sombras diferentes.');

-- Chemistry - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Estados da Água', 'Química', 'Química Geral', 'Fácil', 'O gelo é água em qual estado?', '["Sólido", "Líquido", "Gasoso", "Plasma"]', 'Sólido', 'O gelo é água sólida - você pode pegar! Água líquida você bebe. Vapor é gasoso. Observe cubos de gelo derretendo!'),

('Mistura Visual', 'Química', 'Química Geral', 'Fácil', 'O que acontece quando misturamos água e açúcar?', '["O açúcar dissolve", "Vira gelo", "Explode", "Nada acontece"]', 'O açúcar dissolve', 'O açúcar desaparece na água (dissolve)! Experimente em casa com supervisão.'),

('Reação Observável', 'Química', 'Química Geral', 'Médio', 'O que acontece quando misturamos vinagre e bicarbonato?', '["Faz espuma e bolhas", "Vira pedra", "Congela", "Nada acontece"]', 'Faz espuma e bolhas', 'Essa mistura cria uma reação com bolhas! É seguro e divertido. Faça o experimento do vulcão!'),

('Cores Primárias', 'Química', 'Química Geral', 'Fácil', 'Quais são as cores primárias?', '["Vermelho, Azul, Amarelo", "Verde, Roxo, Laranja", "Preto, Branco, Cinza", "Rosa, Marrom, Bege"]', 'Vermelho, Azul, Amarelo', 'As cores primárias são vermelho, azul e amarelo. Misturando elas fazemos outras cores! Pinte para aprender.');

-- Biology - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Seres Vivos', 'Biologia', 'Ecologia', 'Fácil', 'Qual destes é um ser vivo?', '["Cachorro 🐕", "Pedra 🪨", "Cadeira 🪑", "Carro 🚗"]', 'Cachorro 🐕', 'Seres vivos nascem, crescem, se alimentam e se reproduzem. O cachorro faz tudo isso! Observe animais e plantas.'),

('Partes da Planta', 'Biologia', 'Ecologia', 'Fácil', 'Qual parte da planta fica embaixo da terra?', '["Raiz", "Folha", "Flor", "Fruto"]', 'Raiz', 'A raiz fica embaixo da terra e busca água. Plante um feijão no algodão para ver a raiz crescer!'),

('Cadeia Alimentar Visual', 'Biologia', 'Ecologia', 'Médio', 'O que o coelho come? 🐰', '["Plantas 🌱", "Carne 🥩", "Pedras 🪨", "Plástico"]', 'Plantas 🌱', 'O coelho é herbívoro - come plantas! Use imagens de animais e seus alimentos para aprender.'),

('Sentidos Humanos', 'Biologia', 'Citologia', 'Fácil', 'Com qual parte do corpo você VÊ?', '["Olhos 👀", "Ouvidos 👂", "Nariz 👃", "Boca 👄"]', 'Olhos 👀', 'Usamos os olhos para ver! Temos 5 sentidos: visão (olhos), audição (ouvidos), olfato (nariz), paladar (boca), tato (pele).');

-- English - Adapted Questions
INSERT INTO questions (title, subject, specialty, difficulty, question_text, options, correct_answer, explanation) VALUES
('Cores em Inglês', 'Inglês', 'Vocabulário', 'Fácil', 'Como se diz AZUL em inglês? 🔵', '["Blue", "Red", "Green", "Yellow"]', 'Blue', 'Blue = Azul. Pinte objetos azuis e diga "blue"! Use flashcards coloridos.'),

('Números Visuais', 'Inglês', 'Vocabulário', 'Fácil', 'Quantos dedos? ✋ = Five. Quantos dedos em inglês? ✌️', '["Two", "Five", "Three", "Four"]', 'Two', 'Two = Dois. Conte nos dedos e diga em inglês! Pratique com objetos reais.'),

('Animais em Inglês', 'Inglês', 'Vocabulário', 'Fácil', 'Como se diz GATO em inglês? 🐱', '["Cat", "Dog", "Bird", "Fish"]', 'Cat', 'Cat = Gato. Faça o som do gato e diga "cat"! Use imagens de animais com nomes em inglês.'),

('Cumprimentos', 'Inglês', 'Gramática', 'Fácil', 'Como dizer OLÁ em inglês?', '["Hello", "Goodbye", "Thank you", "Sorry"]', 'Hello', 'Hello = Olá. Pratique cumprimentar em inglês todos os dias! Use gestos junto com as palavras.'),

('Verbo TO BE Visual', 'Inglês', 'Gramática', 'Médio', 'Complete: I ___ happy 😊', '["am", "is", "are", "be"]', 'am', 'I am happy = Eu estou feliz. Use "am" com "I". Faça caras e bocas para cada emoção!'),

('Família em Inglês', 'Inglês', 'Vocabulário', 'Fácil', 'Como se diz MÃE em inglês?', '["Mother", "Father", "Sister", "Brother"]', 'Mother', 'Mother = Mãe. Faça uma árvore genealógica com fotos e nomes em inglês!');
