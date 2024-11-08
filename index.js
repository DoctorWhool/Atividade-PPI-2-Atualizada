import express from 'express';

const app = express();
const porta = 3000;
const host = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));

var listaCliente = [];

function cadastrarCliente(req, resp) {
    resp.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Formulário de Cadastro de Cliente</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <style>
                    /* Estilos do formulário */
                    body { background-color: #f8f9fa; }
                    h1 { color: #343a40; text-shadow: 1px 1px #ddd; }
                    .container { max-width: 800px; margin-top: 30px; padding: 20px; border-radius: 15px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); background-color: #ffffff; }
                    .form-label { color: #495057; }
                    .form-control { border: 2px solid #ced4da; border-radius: 8px; }
                    .input-group-text { background-color: #f8f9fa; border: 2px solid #ced4da; }
                    .btn-primary { background-color: #007bff; border-color: #007bff; padding: 10px 20px; font-size: 16px; border-radius: 8px; }
                    .btn-primary:hover { background-color: #0056b3; border-color: #004085; }
                </style>
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Cliente</h1>
                    <form method="POST" action="/cadastroCliente" class="border p-5 row g-3" novalidate>
                        <div class="col-md-6">
                            <label for="nome" class="form-label">Nome Completo:</label>
                            <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite seu nome" required>
                        </div>
                        <div class="col-md-6">
                            <label for="data_nascimento" class="form-label">Data de Nascimento:</label>
                            <input type="date" class="form-control" id="data_nascimento" name="data_nascimento" required>
                        </div>
                        <div class="col-md-6">
                            <label for="telefone" class="form-label">Telefone:</label>
                            <input type="tel" id="telefone" class="form-control" name="telefone" placeholder="(XX) XXXXX-XXXX" required>
                        </div>
                        <div class="col-md-6">
                            <label for="email" class="form-label">E-mail:</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="email" name="email" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="endereco" class="form-label">Endereço:</label>
                            <textarea id="endereco" class="form-control" name="endereco" rows="3" placeholder="Rua, número, bairro, cidade, estado" required></textarea>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary mt-4" type="submit">Cadastrar</button>
                        </div>
                    </form>                        
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
        </html>
    `);
}

function Menu(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Cliente</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">MENU</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastroCliente">Cadastrar Cliente</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function cadastraCliente(req, resp) {
    const nome = req.body.nome;
    const data_nascimento = req.body.data_nascimento;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const endereco = req.body.endereco;

    const cliente = { nome, data_nascimento, email, telefone, endereco };

    listaCliente.push(cliente);

    resp.write(`
        <html>
            <head>
                <title>Lista dos Clientes</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="UTF-8">
            </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Data de Aniversário</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Endereço</th>
                    </tr>
                </thead>
                <tbody>
    `);

    for (let i = 0; i < listaCliente.length; i++) {
        resp.write(`
            <tr>
                <td>${listaCliente[i].nome}</td>
                <td>${listaCliente[i].data_nascimento}</td>
                <td>${listaCliente[i].email}</td>
                <td>${listaCliente[i].telefone}</td>
                <td>${listaCliente[i].endereco}</td>
            </tr>
        `);
    }

    resp.write(`
                </tbody> 
            </table>
            <a class="btn btn-primary" href="/cadastroCliente">Continuar Cadastrando</a>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);

    resp.end();
}

app.get('/', Menu);
app.get('/cadastroCliente', cadastrarCliente);

app.post('/cadastroCliente', cadastraCliente);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});