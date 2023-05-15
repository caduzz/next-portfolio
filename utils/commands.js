const data = {
    folders: [
        {
            name: 'Habilidades',
            type: 'folder',
            folders: [  
                {
                    name: 'Pasta',
                    type: 'folder',
                    folders: []
                }
            ]
        },
        {
            name: 'About',
            type: 'folder',
            folders: [
                {
                    name: 'Email',
                    type: 'folder',
                    folders: []
                },
                {
                    name: 'file.md',
                    type: 'file',
                    content: `
                        <h2>File teste</h2>
                    `,
                    folders: []
                }
            ]
        },
        {
            name: 'Contacts',
            type: 'folder',
            folders: [
                {
                    name: 'email.txt',
                    type: 'file',
                    folders: [],
                    content: `
                        <h1>Title</h1>
                        <p>Email: cadu0970@gmail.com</p>
                    `
                },
                {
                    name: 'github.txt',
                    type: 'file',
                    folders: [],
                    content: `
                        <h1>Title</h1>
                        <p>Github: <a href="https://github.com/caduzz" target="_blank">Click-me</a></p>
                    `
                },
                {
                    name: 'linkedin.txt',
                    type: 'file',
                    folders: [],
                    content: `
                        <h1>Title</h1>
                        <p>Linkedin: <a href="https://www.linkedin.com/in/cadu-dev/" target="_blank">Click-me</a></p>
                    `
                }
            ]
        },
        {
            name: 'Projects',
            type: 'folder',
            folders: [
                {
                    name: 'file.txt',
                    type: 'file',
                    content: `<h2>File teste</h2>`,
                    folders: []
                }
            ]
        }   
    ]
}

export const commands = [
    {
        name: 'help',
        description: 'Ajuda terminal',
        fn: () => {
            const commandFilter = commands.filter((command) => command.name !== 'help')
            return `|================================|
|      Comandos disponíveis      |
|================================|

${commandFilter.map((command) => ` ${command.name} - ${command.description}`).join('\n')}
            `
        }
    },
    {
        name: 'echo',
        description: 'Exibi a message',
        fn: ({args}) => {
            return ` ${args.join(' ')}`
        }
    },
    {
        name: 'clear',
        description: 'Limpa todos o terminal',
        fn: ({output}) => {
            output('')
        }
    },
    {
        name: 'ls',
        description: 'Listar todos os diretórios',
        fn: ({ folder }) => {
            const currentFolder = folder.split('/').filter(Boolean);
            let currentLevel = data;
            for (const folderName of currentFolder) {
                const foundFolder = currentLevel.folders.find(
                    (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
                );
                if (foundFolder) {
                    currentLevel = foundFolder;
                } else {
                    return ` Nenhuma pasta ou diretório`;
                }
            }
            return currentLevel.folders
            .map((item) => ` ${item.type === 'folder' ? '📁' : '📄'} ${item.name}`)
            .join(' ')
        },
    },
    {
        name: 'cd',
        description: 'Entrar em um diretório',
        fn: ({ args, folder, setFolder }) => {
            let folderName = args[0];
            if(!folderName) return ` Nenhuma pasta ou diretório`;


            if (folderName === '..') {
                const parentFolder = folder.split('/').slice(0, -1).join('/');
                setFolder(parentFolder);
                return ' Voltar pasta ou diretório';
            }

            const currentFolder = folder.split('/').filter(Boolean);
            let currentLevel = data;
            for (const folderName of currentFolder) {
                const foundFolder = currentLevel.folders.find(
                    (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
                );
                if (foundFolder) {
                    currentLevel = foundFolder;
                } else {
                    return ` "${folderName}" Não existe tal arquivo ou diretório`;
                }
            }

            const foundFolder = currentLevel.folders.find(
                (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
            );
            if (foundFolder && foundFolder.type === 'folder') {
                if (folder) {
                    setFolder(`${folder}/${folderName}`);
                } else {
                    setFolder(`/${folderName}`);
                }
                return ` Diretorio "${folderName}" encontrado`;
            } else {
                return ` "${folderName}" Não existe tal arquivo ou diretório`;
            }
        },
    },
    {
        name: 'mkdir',
        description: 'Criar um diretório',
        fn: ({ args, folder }) => {
            const folderName = args[0];
            if (!folderName) return ` pasta ou diretório`;
    
            const currentFolder = folder.split('/').filter(Boolean);
            let currentLevel = data;
            for (const folderName of currentFolder) {
                const foundFolder = currentLevel.folders.find(
                    (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
                );
                if (foundFolder) {
                    currentLevel = foundFolder;
                } else {
                    return ' Nenhuma pasta ou diretório';
                }
            }
    
            currentLevel.folders.push({
                name: folderName,
                type: 'folder',
                folders: []
            });
    
            return ` Pasta "${folderName}" criada com sucesso.`;
        }
    },
    {
        name: 'rmdir',
        description: 'Excluir um diretório',
        fn: ({ args, folder }) => {
          const foldername = args[0]
          const currentFolder = folder.split('/').filter(Boolean);
      
          if (foldername === currentFolder[0]) {
            data.folders = data.folders.filter((folder) => folder.name !== foldername)
            return ` Pasta ${foldername} excluída`;
          }
      
          let currentLevel = data;
          for (const folderName of currentFolder) {
            const foundFolder = currentLevel.folders.find(
              (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
            );
            if (foundFolder) {
              currentLevel = foundFolder;
            } else {
              return ` Pasta ${foldername} não encontrada`;
            }
          }
      
          const foundFolderIndex = currentLevel.folders.findIndex(
            (folder) => folder.name.toLowerCase() === foldername.toLowerCase()
          );
          if (foundFolderIndex !== -1) {
            const folderToDelete = currentLevel.folders[foundFolderIndex];
            if (folderToDelete.type !== 'folder') {
              return ` Erro: ${foldername} não é uma pasta`;
            }
            currentLevel.folders.splice(foundFolderIndex, 1);
            return ` Pasta ${foldername} excluída`;
          } else {
            return ` Pasta ${foldername} não encontrada`;
          }
        }
    },
    {
        name: 'show',
        description: 'Exibir o conteúdo de um arquivo',
        fn: ({ args, folder }) => {
            const fileName = args[0];
            if (!fileName) return 'Nenhum nome de arquivo especificado.';
    
            const currentFolder = folder.split('/').filter(Boolean);
            let currentLevel = data;
    
            for (const folderName of currentFolder) {
                const foundFolder = currentLevel.folders.find(
                    (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
                );
                if (foundFolder) {
                    currentLevel = foundFolder;
                } else {
                    return ' Nenhum diretório ou arquivo encontrado.';
                }
            }
    
            const foundFile = currentLevel.folders.find(
                (file) => file.name.toLowerCase() === fileName.toLowerCase() && file.type === 'file'
            );
            if (foundFile && foundFile.content) {
                return foundFile.content;
            } else {
                return ' Nenhum arquivo encontrado ou sem conteúdo.';
            }
        },
    },
    {
        name: 'github',
        description: 'Mostrar os meos projetos',
        fn: ({args, repos}) => {
            switch (true) {
                case (args[0] === '--list' || args[0] === '-l'):
                    return repos.map((repo) => ` ${repo.name}`).join('\n')
                case (args[0] === '--help' || args[0] === '-h'):
                    return ' --help or -h: lista os comandos\n --list or -l: lista os projetos\n --sersh -s <string> Busca um projeto'
                case (args[0] === '--search' || args[0] === '-s'):
                    if (!args[1]) 
                        return ' Comando não encontrado. --search -s <string> Busca um projeto'
                    const repo = repos.filter(repo => repo.name.includes(args[1]))
                    return repo.map((repo) => 
                        ` <a style="color: #f47cbe; text-decoration: underline;" target="_blank" href='${repo.url}'>${repo.name}</a>`).join('\n')
                default:
                    return ` Comando não encontrado. --help ou -h para listar os comandos`
            }
        }
    }
]