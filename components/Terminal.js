import React, { useEffect, useRef, useState } from 'react';
import style_terminal from '../styles/Terminal.module.css'

import { commands } from '../utils/commands'

const initialMessage = `<span style="color: #a1a1a1">
| Bem vindo
| help para qualquer duvida

</span>`

export default function Terminal({ repos }) {
    const [output, setOutput] = useState(initialMessage);
    const [command, setCommand] = useState('');
    const [userName, setUserName] = useState('root')

    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const [folder, setFolder] = useState('');

    const inputRef = useRef(null);
    const terminalOutputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    };

    const handleInputChange = (event) => {
        setCommand(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            executeCommand();
        } else if (event.key === 'ArrowDown') {
            if (historyIndex > 0) {
              setHistoryIndex((prevIndex) => prevIndex - 1);
              setCommand(commandHistory[historyIndex - 1]);
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
              setHistoryIndex((prevIndex) => prevIndex + 1);
              setCommand(commandHistory[historyIndex + 1]);
            } else {
              setHistoryIndex(-1);
              setCommand('');
            }
          }
    };

    const executeCommand = () => {
        const name = command.split(' ')[0];
        const args = command.split(' ').slice(1);

        const selcted_command = commands.find(command_s => command_s.name === name)
        if(!selcted_command){
            if(!name){
                return setOutput((prevOutput) => prevOutput + `<span style="color: #be7cf4">user@web<span style="color: #ffffff">:<span style="color: #f03498">~</span>$</span></span>\n`);
            }
            setCommand('');
            return setOutput((prevOutput) => prevOutput + `<span style="color: #f04646">$ Command '${command}' not found</span> \n`);
        }

        const exec = selcted_command.fn({
            args, 
            repos, 
            folder,
            setUserName,
            setFolder,
            output: (value) => setOutput(value)
        })

        setCommandHistory((prevHistory) => [command, ...prevHistory]);
        setHistoryIndex(-1);

        if(exec !== undefined)
        setOutput((prevOutput) => 
            prevOutput + 
            `<span style="color: #f03498"s>user@web:~${folder}$ ${command}</span>\n<span style="color: #a1a1a1">${exec}</span>\n`
        );

        setCommand('');
    };


    useEffect(() => {
        terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }, [output]);

    return (
        <div className={style_terminal.container}>
        <div className={style_terminal.terminal_container} onMouseUp={handleClick}>
            <div className={style_terminal.terminal_output} ref={terminalOutputRef}>
                <pre> 
                    <div dangerouslySetInnerHTML={{ __html: output }}/>
                    <div className={style_terminal.terminal_input}>
                        <div 
                            className={style_terminal.prompt}
                        >
                            user@web<span style={{color: '#fff'}}>:<span style={{color: '#f03498'}}>~{folder}</span>$</span>
                        </div>
                        <input
                            ref={inputRef}
                            className={style_terminal.input}
                            type="text"
                            value={command}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>
                </pre>
            </div>
        </div>
        </div>
    );
}