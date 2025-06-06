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
};

export {
    dateFormatDateOnly,
    dateFormatFull,
    dateFormatTimeOnly,
    emotionsBasic,
    emotionNothing,
}
