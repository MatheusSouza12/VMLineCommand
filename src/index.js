var http = require("http");
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
      const base = ('/home/matheussouza/VirtualBox\\ VMs/Ubuntu64/Ubuntu64.vdi')
      const discoNovo = (`/home/matheussouza/VirtualBox\\ VMs/${name}/${name}.vdi`)
      shell.echo(name)
      shell.echo(cpu)
      shell.echo(ram)
      shell.echo(ip)
      shell.exec(
        `vboxmanage createvm --name ${name} --ostype Ubuntu_64 --register;\n` +
        `vboxmanage modifyvm ${name} --memory ${ram} --vram 64 --acpi on --boot1 dvd --vrde on --firmware efi --cpus ${cpu};\n` +
        `vboxmanage clonehd ${base} ${discoNovo} --format VDI;\n` +
        `vboxmanage storagectl ${name} --name "IDE Controller" --add ide;\n` +
        `vboxmanage storageattach ${name} --storagectl "IDE Controller" --port 0 --device 0 --type hdd --medium ${discoNovo}; \n`
      );
    }
    return res.end();
  });
server.listen(3000);


console.log("Servidor iniciado!");