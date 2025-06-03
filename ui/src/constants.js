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
    { emoji: '🤮', text: 'disgust' },
    { emoji: '😠', text: 'anger' },
    { emoji: '😁', text: 'joy' },
    { emoji: '☹️', text: 'sadness' },
    { emoji: '😨', text: 'fear' },
    { emoji: '😲', text: 'surprise' },
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
