import os from 'os';

class Info {
  constructor() {}

  getHostInfo = async () => {
    const numCPUs = os.cpus().length;
    const info = `
<h1>Información</h1>
<p>Argumentos entrada: ${
      process.argv.slice(2) != '' ? process.argv.slice(2) : 'Sin argumentos'
    }</p>
<p>Sistema operativo: ${process.platform}</p>
<p>Número de procesadores: ${numCPUs}</p>
<p>Versión NodeJS: ${process.version}</p>
<p>Memoria reservada: ${parseFloat(
      process.memoryUsage().rss / (1024 * 1024)
    ).toFixed(2)} MB</p>
<p>Path de ejecución: ${process.execPath}</p>
<p>Process ID: ${process.pid}</p>
<p>Carpeta del proyecto: ${process.cwd()}</p>
`;
    return info;
  };
}

export default Info;
