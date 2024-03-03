# Documentação do Projeto Dashboard

Bem-vindo à documentação do Projeto Dashboard. Este documento fornece informações importantes sobre como instalar, configurar e utilizar o projeto.

## Instalação

Para instalar o projeto, siga estas etapas:

1. Certifique-se de ter o Node.js e o npm instalados em seu sistema. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

2. Clone este repositório em sua máquina local usando o seguinte comando:

```
git clone https://github.com/GabrielGirardi/dashboard.git
   
```

1. Navegue até o diretório do projeto:

```
cd dashboard
```

2. Navegue até o frontend:

```
cd project
```

3. instale as dependências do projeto com o seguinte comando:

```
npm install
```

4. Retorne ao diretório principal do projeto:

```
cd ..
```

5. Navegue até o backend:

```
cd backend
```

6. Novamente execute o comando para baixar as dependências:

```
npm install
```

##Configuração do Banco de Dados

O acesso ao banco de dados é liberado por IP. No entanto, o acesso está disponível apenas até o dia 9 de Marçp de 2024. Caso queira acesso após a expiração, entre em contato comigo!

## Utilização

Após a instalação e configuração, você pode iniciar o servidor local executando o seguinte comando:

```
cd backend
npm start
```

Isso iniciará o servidor e tornará o projeto backend disponível no endereço `http://localhost:3000`, lembre-se que exite as rotas para as coleções, como `link/api/customers`.

Para iniciar o frontend, abra outro terminal e execute o seguinte comando:

```
cd project
npm run dev
```

Isso iniciará o frontend e tornará o projeto disponível no endereço `http://localhost:5173`

##Futuras Melhorias

Estarei buscando maneiras de melhorar nosso projeto e proporcionar uma experiência ainda melhor aos usuários. Abaixo estão algumas melhorias planejadas que pretendo implementar no futuro:

1. Refatoração do Código

Estou comprometido em refatorar nosso código existente para torná-lo mais limpo, organizado e fácil de manter. Isso inclui a identificação de partes do código que podem ser simplificadas, divididas em funções menores ou otimizadas para melhorar a legibilidade e a manutenção do código.

2. Validações Avançadas

Planejo implementar validações mais complexas nos dados de entrada, como validação de formato de e-mail, tela de login, entre outras. Isso garantirá a integridade dos dados e uma melhor experiência para o usuário.

3. Melhorias na Experiência do Usuário (UX)

Estou trabalhando para aprimorar nossa interface do usuário com animações suaves, feedbacks visuais claros e um design responsivo que funcione bem em dispositivos móveis. Além disso, pretendo adicionar funcionalidades de pesquisa, filtros e ordenação para facilitar a navegação e a localização de informações dentro do aplicativo.

Estou empolgado com essas melhorias e ansioso para compartilhar os resultados com vocês. Fiquem atentos às futuras atualizações do projeto!
