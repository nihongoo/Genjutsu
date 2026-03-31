'use client';

import { useState, useRef, useEffect } from 'react';

export function CommandsWindow() {
    const [history, setHistory] = useState<string[]>([
        'Windows PowerShell',
        'Type "help" to see available commands.',
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const runCommand = (cmd: string) => {
        const args = cmd.trim().toLowerCase();

        let output = '';

        switch (args) {
            case 'kinjutsu':
                output = `
Available kinjutsu:
- izanagi
- izanami
- kotoamatsukami
        `;
                break;

            case 'izanagi':
                output = 'izanagi is a powerful genjutsu that allows the user to control their own fate by turning illusions into reality. It can be used to escape death or alter the outcome of events.';
                break;

            case 'izanami':
                output = 'izanami is a powerful genjutsu that traps the target in an infinite loop of events. It is often used as a last resort to incapacitate an opponent.';
                break;
            case 'kotoamatsukami':
                output = 'kotoamatsukami.';
                break;

            case 'cls':
                setHistory([]);
                return;

            default:
                output = `kinjutsu not found: ${cmd}`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            runCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="bg-black text-red-400 font-mono text-sm h-full w-full overflow-auto p-1"
            onClick={() => inputRef.current?.focus()}
        >
            {/* History */}
            <div className="space-y-1">
                {history.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                        {line}
                    </div>
                ))}
            </div>

            {/* Input line */}
            <div className="flex items-center mt-2">
                <span className="mr-2">{'>'}</span>
                <input
                    ref={inputRef}
                    className="bg-transparent outline-none flex-1 text-red-400 caret-red-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}