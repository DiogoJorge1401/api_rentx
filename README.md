# Cadastro de carro

**RF:**

- Deve ser possível cadastrar um novo carro.

**RN:**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado com disponibilidade por padrão.
- Apenas o usuário administrador poderá cadastrar um novo carro.

<br/>

# Listagem de carros

**RF:**

- Deve ser possível listar todos carros disponíveis.
- Deve ser possível listar todos carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos carros disponíveis pelo nome da marca.
- Deve ser possível listar todos carros disponíveis pelo nome do carro.

**RN:**

- Não é necessário que o usuário esteja logado no sistema.

<br/>

# Cadastro de especificação no carro

**RF:**

- Deve ser possível cadastrar uma especificação para um carro.

**RN:**

- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar uma especificação já existente em um carro.
- Apenas o usuário administrador poderá cadastrar uma nova especificação.

<br/>

# Cadastro de imagens do carro

**RF:**

- Deve ser possível cadastrar a imagem do carro.

**RNF:**

- Utilizar o multer para upload dos arquivos

**RN:**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- Apenas o usuário administrador poderá cadastrar uma nova imagem.

<br/>

# Aluguel de carro

**RF:**

- Deve ser possível cadastrar um aluguel.

**RN:**

- O aluguel deve ter duração miníma de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação
- O carro deve existir
- Ao realizar o aluguel, o status do carro deverá ser alterado para indísponivel

<br>

# Devolução de carro

**RF**

- Deve ser possível realizar a devolução de um carro

**RN**

- Se o carro for devolvido com menos de 24 hors, deverá ser cobrada diária completa.
- Ao realzar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realzar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realzar a devolução, deverá ser caluculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação

<br>

# Listagem de Alugueis para usuário

**RF**

- Deve ser possível realizar a busca de todos os alugueis do usuário

**RN**

- O usuário deve estar logado na aplicação

# Recuperar Senha

**RF**

- Deve ser possível o usuário recuperar a senha informando o e-mail
- O osuário deve receber um e-mail com passo a passo para a recuperação da senha
- O usuário deve conseguir uma nova senha

**RN**

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas

<hr>

# Rotas/Documentação:
## Para conhecer as rotas da aplicação cheque a rota: <a href="">/api-docs</a>
