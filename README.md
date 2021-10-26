# SISTEMA DE GERENCIAMENTO DE PROJETOS COM TÉCNICAS DE GAMIFICAÇÃO

Trabalho desenvolvido para a conclusão do curso de Engenharia de Software - Católica de Santa Catarina - Jaraguá do Sul
 
Autor: Gabriel Zanghelini

## Alterar cor primária do Antd 

##### Requisitos: antd e less instalados

1. Criar arquivo `custom-theme.less` no caminho  `node_modules\antd\dist`
2. Adicionar a customização desejada no arquivo. Padrão: `@import "./antd.less"; @primary-color: #77bd69;`...
3. Rodar o comando `lessc --js .\node_modules\antd\dist\custom-theme.less .\node_modules\antd\dist\result.css`
4. Rodar o comando `lessc --js .\node_modules\antd\dist\custom-theme.less .\src\styles\custom-antd.css`
5. No arquivo `index.js` adicionar o comando `import "./styles/custom-antd.css";`
