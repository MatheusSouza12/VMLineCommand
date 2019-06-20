var http = require("http"); //Requisitando a biblioteca http
var shell = require("shelljs");

http
  .createServer(function(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.write("Olá mundo!");
    res.end();
  })
  .listen(3000);

shell.echo("hello world");
shell.exec("mkdir teste");
shell.exec(
  "vboxmanage createvm --name LinhaDeComando --ostype Ubuntu_64 --register"
);
console.log("Servidor iniciado!");
