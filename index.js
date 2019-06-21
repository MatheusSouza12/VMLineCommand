var http = require("http"); //Requisitando a biblioteca http
var shell = require("shelljs");
const url = require('url');

const server = http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    if (req.method === 'GET') {
      const {
        query: {
          name,
          cpu,
          ram,
          ip
        }
      } = url.parse(req.url, true);
      shell.echo(name)
      shell.echo(cpu)
      shell.echo(ram)
      shell.echo(ip)
      shell.exec(
        `vboxmanage createvm --name ${name} --ostype Ubuntu_64 --register;\n` +
        `vboxmanage modifyvm ${name} --memory ${ram};\n`
      );
    }
    return res.end();
  });
server.listen(3000, () => console.log('Listening on port 3000'));


console.log("Servidor iniciado!");