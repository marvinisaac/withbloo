const dateFormatDateOnly = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
};

const dateFormatFull = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
};

const dateFormatTimeOnly = {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
};

const getCombinedEmotions = (emotionA, emotionB) => {
    if (!emotionA || !emotionB) {
        return null;
    }

    const emotionAFull = emotionsBasic.find(({ text }) => text === emotionA);
    const emotionBFull = emotionsBasic.find(({ text }) => text === emotionB);
    const combinations = {
        'anger disgust':  { text: 'contempt', verb: 'contemptuous' },
        'anger fear': { text: 'panic', verb: 'panicked' },
        'anger joy': { text: 'vindication', verb: 'vindicated' },
        'anger sadness': { text: 'grief', verb: 'grieving' },
        'anger surprise': { text: 'shock', verb: 'shocked' },
        'disgust fear': { text: 'revulsion', verb: 'repulsed' },
        'disgust joy': { text: 'intrigue', verb: 'intrigued' },
        'disgust sadness': { text: 'shame', verb: 'ashamed' },
        'disgust surprise': { text: 'horror', verb: 'horrified' },
        'fear joy': { text: 'nervousness', verb: 'nervous' },
        'fear sadness': { text: 'anxiety', verb: 'anxious' },
        'fear surprise': { text: 'alarm', verb: 'alarmed' },
        'joy sadness': { text: 'nostalgia', verb: 'nostalgic' },
        'joy surprise': { text: 'excitement', verb: 'excited' },
        'sadness surprise': { text: 'disappointment', verb: 'disappointed' },
    };

    const [a, b] = [emotionA, emotionB].sort();
    return {
        emoji: `${emotionAFull.emoji}${emotionBFull.emoji}`,
        text: combinations[`${a} ${b}`].text,
        verb: combinations[`${a} ${b}`].verb,
    };
};

const emotionsBasic = [
    { emoji: '🤮', text: 'disgust', verb: 'disgusted' },
    { emoji: '😠', text: 'anger', verb: 'angry' },
    { emoji: '😁', text: 'joy', verb: 'happy' },
    { emoji: '☹️', text: 'sadness', verb: 'sad' },
    { emoji: '😨', text: 'fear', verb: 'afraid' },
    { emoji: '😲', text: 'surprise', verb: 'surprised' },
];

const emotionNothing = {
    emoji: '😐',
    text: 'not sure',
    verb: 'unsure',
};

export {
    dateFormatDateOnly,
    dateFormatFull,
    dateFormatTimeOnly,
    emotionsBasic,
    emotionNothing,
    // Function that return a constant
    getCombinedEmotions,
}
