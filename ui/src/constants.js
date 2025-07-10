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

    const emotionAFull = emotionsBasic.find(({ noun }) => noun === emotionA);
    const emotionBFull = emotionsBasic.find(({ noun }) => noun === emotionB);
    const combinations = {
        'anger disgust':  { noun: 'contempt', verb: 'contemptuous' },
        'anger fear': { noun: 'panic', verb: 'panicked' },
        'anger joy': { noun: 'vindication', verb: 'vindicated' },
        'anger sadness': { noun: 'grief', verb: 'grieving' },
        'anger surprise': { noun: 'shock', verb: 'shocked' },
        'disgust fear': { noun: 'revulsion', verb: 'repulsed' },
        'disgust joy': { noun: 'intrigue', verb: 'intrigued' },
        'disgust sadness': { noun: 'shame', verb: 'ashamed' },
        'disgust surprise': { noun: 'horror', verb: 'horrified' },
        'fear joy': { noun: 'nervousness', verb: 'nervous' },
        'fear sadness': { noun: 'anxiety', verb: 'anxious' },
        'fear surprise': { noun: 'alarm', verb: 'alarmed' },
        'joy sadness': { noun: 'nostalgia', verb: 'nostalgic' },
        'joy surprise': { noun: 'excitement', verb: 'excited' },
        'sadness surprise': { noun: 'disappointment', verb: 'disappointed' },
    };

    const [a, b] = [emotionA, emotionB].sort();
    return {
        emoji: `${emotionAFull.emoji}${emotionBFull.emoji}`,
        noun: combinations[`${a} ${b}`].noun,
        verb: combinations[`${a} ${b}`].verb,
    };
};

const emotionsBasic = [
    { emoji: '🤮', noun: 'disgust', verb: 'disgusted' },
    { emoji: '😠', noun: 'anger', verb: 'angry' },
    { emoji: '😁', noun: 'joy', verb: 'happy' },
    { emoji: '☹️', noun: 'sadness', verb: 'sad' },
    { emoji: '😨', noun: 'fear', verb: 'afraid' },
    { emoji: '😲', noun: 'surprise', verb: 'surprised' },
];

const emotionNothing = {
    emoji: '😐',
    noun: 'unsure',
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
