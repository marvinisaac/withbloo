<script setup>
    import db from '@/singleton/database';
    import JSZip from 'jszip';
    import { Marked } from 'marked';

    const marked = new Marked();

    const backup = async () => {
        const dateBackup = new Date();
        const data = await db.entry.getAll();
        if (!data || !data.length) {
            alert('No entry to backup');
            return;
        }
        
        const zip = new JSZip();
        const entries = [];
        const imagesFolder = zip.folder('images');

        for (let i = 0; i < data.length; i++) {
            const entry = { ...data[i] };
            entries.push(entry);
            if (entry.image && entry.image.startsWith('data:')) {
                const imageFilename = `${entry.id}.webp`;
                const base64 = entry.image.split(',')[1];
                imagesFolder.file(imageFilename, base64, { base64: true });
                entry.image = imageFilename;
            }
        }

        // Add other files to ZIP file
        zip.file('entries.json', JSON.stringify(entries));
        zip.file('index.html', createHtml(dateBackup, entries));

        // Generate and trigger download of ZIP file
        const blob = await zip.generateAsync({
            type: 'blob',
            compression: "DEFLATE",
            compressionOptions: {
                level: 9,
            },
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `withbloo-backup-${dateBackup.toISOString().replace(/:/g, '-')}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const capitalizeWords = (string) => {
        return string
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const createHtml = (dateBackup, entries) => {
        const htmlStart = `
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>With Bloo - Backup (${dateBackup.toLocaleString()})</title>
        <style>
            body {
                font-family: sans-serif;
                margin: 2em;
            }
            h1 {
                margin: 0;
            }
            sub {
                display: block;
                margin-bottom: 1em;
            }
            .entry {
                border-top: 1px solid #ccc;
                padding: 1em 0;
            }
            .entry div {
                border-radius: 0.25em;
                border-left: 0.25em solid #ccc;
                padding-left: 1em;
            }
            .entry img {
                border-radius: 0.25em;
                display: block;
                margin-top: 0.5em;
                width: 100%;
                    max-width: 360px;
            }
        </style>
    </head>
    <body>
        <h1>With Bloo Backup</h1>
        <sub>${dateBackup.toLocaleString()}</sub>
        <div class="entries">
        `;
        const htmlEnd = `
        </div>
    </body>
</html>
        `;
        let htmlEntries = '';
        entries.forEach(entry => {
            htmlEntries += `
            <div class="entry">
                <p><b>Date:</b> ${ (new Date(entry.createdAt)).toLocaleString() }</p>
                <p><b>Emotion:</b> ${ capitalizeWords(entry.emotion) }</p>
                ${entry.journal
                    ? `
                <p><b>Journal:</b></p>
                <div>${ marked.parse(entry.journal) || '' }</div>`
                    : ''
                }
                ${entry.image
                    ? `
                <img src="images/${entry.image}" alt="image">`
                    : ''
                }
            </div>
            `
        });
        return htmlStart + htmlEntries + htmlEnd;
    }
</script>

<template>
    <button @click="backup" type="button">
        Download Backup
    </button>
</template>
