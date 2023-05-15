const data = {
    folders: [
        {
            name: 'Habilidades',
            type: 'folder',
            folders: [  
                {
                    name: 'file.md',
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
                    name: 'email',
                    type: 'folder',
                    folders: []
                },
                {
                    name: 'file.md',
                    type: 'file',
                    folders: []
                }
            ]
        },
        {
            name: 'Contactme',
            type: 'folder',
            folders: [
                {
                    name: 'file.md',
                    type: 'file',
                    folders: []
                }
            ]
        },
        {
            name: 'Projects',
            type: 'folder',
            folders: [
                {
                    name: 'file.md',
                    type: 'file',
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
            return commandFilter.map((command) => ` ${command.name} - ${command.description}`).join('\n')
        }
    },
    {
        name: 'echo',
        description: 'Exibi a message',
        fn: ({args}) => {
            return ` ${args.join(',')}`
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
                    return `No such folder or directory`;
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
            if(!folderName) return ' No such file or directory';


            if (folderName === '..') {
                const parentFolder = folder.split('/').slice(0, -1).join('/');
                setFolder(parentFolder);
                return ' Such file or directory';
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
                    return ` No such file or directory`;
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
                return ' Such file or directory';
            } else {
                return ' No such file or directory';
            }
        },
    },
    {
        name: 'mkdir',
        description: 'Criar um diretório',
        fn: ({ args, folder }) => {
            const folderName = args[0];
            if (!folderName) return 'No folder name specified.';
    
            const currentFolder = folder.split('/').filter(Boolean);
            let currentLevel = data;
            for (const folderName of currentFolder) {
                const foundFolder = currentLevel.folders.find(
                    (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
                );
                if (foundFolder) {
                    currentLevel = foundFolder;
                } else {
                    return 'No such folder or directory';
                }
            }
    
            currentLevel.folders.push({
                name: folderName,
                type: 'folder',
                folders: []
            });
    
            return `Folder "${folderName}" created successfully.`;
        }
    },
    {
        name: 'rmdir',
        description: 'Remover um diretório vazio',
        fn: ({ args, folder, setFolder }) => {
            const folderName = args[0];
            if (!folderName) return 'No folder name specified.';
    
            const currentFolder = folder.split('/').filter(Boolean);
            let currentLevel = data;
            let parentLevel = null;
            let targetFolderIndex = -1;
    
            for (const folderName of currentFolder) {
                parentLevel = currentLevel;
                const foundFolderIndex = currentLevel.folders.findIndex(
                    (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
                );
                if (foundFolderIndex !== -1) {
                    currentLevel = currentLevel.folders[foundFolderIndex];
                    targetFolderIndex = foundFolderIndex;
                } else {
                    return 'No such folder or directory';
                }
            }
    
            if (
                currentLevel.type !== 'folder' ||
                currentLevel.folders.length > 0
            ) {
                return 'Cannot remove a non-empty folder.';
            }
    
            parentLevel.folders.splice(targetFolderIndex, 1);
    
            // If the current directory is being removed, move back to the parent directory
            if (currentFolder.length === 1 && currentFolder[0] === folderName) {
                setFolder('');
            }
    
            return `Folder "${folderName}" removed successfully.`;
        }
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
                        return 'Command not found. --search -s <string> Busca um projeto'
                    const repo = repos.filter(repo => repo.name.includes(args[1]))
                    return repo.map((repo) => 
                        ` <a style="color: #f47cbe; text-decoration: underline;" target="_blank" href='${repo.url}'>${repo.name}</a>`).join('\n')
                default:
                    return `Command not found. --help or -h para listar os comandos`
            }
        }
    }
]