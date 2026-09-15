# Catálogo Interativo Mobile

Aplicativo mobile desenvolvido em **React Native + Expo** para exibição de produtos de
uma loja online, organizados por categoria (masculino/feminino), com navegação entre
telas e consumo da API pública [DummyJSON](https://dummyjson.com/docs) via Axios.

Projeto desenvolvido para a disciplina de **Mobile Development**.

> Projeto atualizado para **Expo SDK 54** (React Native 0.81, React 19, New Architecture habilitada por padrão).

## Tecnologias utilizadas

- [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/) SDK 54)
- [Axios](https://axios-http.com/) — consumo da API REST
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) — estado global de autenticação
- [React Navigation](https://reactnavigation.org/) — navegação em pilha (Stack) e abas (Material Top Tabs)

## Funcionalidades implementadas

- **Login simulado** com validação de e-mail e senha (React Native puro, sem backend real).
- **Armazenamento do usuário logado** via Redux Toolkit (`authSlice`).
- **Listagem de produtos por categoria**, organizada em abas:
  - Masculino: `mens-shirts`, `mens-shoes`, `mens-watches`
  - Feminino: `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`
- **Filtro por sub-categoria** dentro de cada aba (chips "Todos" + cada categoria).
- **Estados de carregamento e erro** tratados em todas as telas que consomem a API, com botão de "Tentar novamente".
- **Tela de detalhes do produto**, buscando `GET /products/{id}` e exibindo nome, descrição, preço, desconto e imagem.
- **Logout** no cabeçalho da tela de produtos, que limpa o estado do Redux e retorna à tela de login.

## Estrutura do projeto

```
catalogo-mobile/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── components/
    │   └── ProductCard.js          # card de produto usado na listagem
    ├── constants/
    │   └── categories.js           # categorias masculinas e femininas
    ├── navigation/
    │   ├── AppNavigator.js         # stack principal (Login / Produtos / Detalhes)
    │   └── ProductTabsNavigator.js # abas Masculino / Feminino
    ├── redux/
    │   ├── store.js
    │   └── slices/
    │       └── authSlice.js        # estado de login/logout
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── ProductListScreen.js
    │   └── ProductDetailScreen.js
    └── services/
        └── api.js                  # instância do Axios e chamadas à DummyJSON
```

## Como executar o projeto

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (LTS, 18+)
- npm ou yarn
- App **Expo Go** instalado no celular (Android/iOS), ou um emulador Android/iOS configurado

### 2. Instalação
```bash
git clone <URL-DO-SEU-REPOSITORIO>
cd catalogo-mobile
npm install
```

### 3. Executar
```bash
npx expo start
```
- Escaneie o QR Code com o app **Expo Go** (Android) ou a câmera (iOS), ou
- Pressione `a` para abrir no emulador Android, ou `i` para o simulador iOS.

### 4. Login
Use qualquer e-mail em formato válido (ex.: `teste@email.com`) e uma senha com 4+
caracteres — o login é simulado e não valida contra um backend real.

## API utilizada

Todos os dados de produtos vêm da API pública e gratuita [DummyJSON](https://dummyjson.com/docs):
- Listagem por categoria: `GET https://dummyjson.com/products/category/{categoria}`
- Detalhe do produto: `GET https://dummyjson.com/products/{id}`
