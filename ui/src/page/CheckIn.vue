<script setup>

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h12'
        })
        .replaceAll(',', '');

    const emotionsBasic = [
        { emoji: '🤮', text: 'Disgust' },
        { emoji: '😠', text: 'Anger' },
        { emoji: '😁', text: 'Joy' },
        { emoji: '☹️', text: 'Sadness' },
        { emoji: '😨', text: 'Fear' },
        { emoji: '😲', text: 'Surprise' },
    ];
</script>

<template>
    <div class="container-check-in">
        <p class="check-in-prompt">
            What are you feeling right now?
        </p>
        <div class="check-in-choices">
            <div class="choice"
                v-for="(emotion, index) in emotionsBasic"
                :key="index"
            >
                <span class="choice-emoji">  {{ emotion.emoji }}</span>
                <span class="choice-text"> {{ emotion.text }}</span>
            </div>
        </div>
        <p class="date-current">
            {{ formattedDate }}
        </p>
    </div>
</template>

<style lang="scss">
.container-check-in {
    display: flex;
        flex-direction: column;
        justify-content: center;
    min-height: 100vh;
    text-align: center;
    width: 100%;
    .check-in-prompt {
        font-size: 1.25rem;
    }
    .check-in-choices {
        display: flex;
            gap: 0.25rem;
            justify-content: center;
        margin: 2rem 0;
        .choice {
            cursor: pointer;
            display: flex;
                flex-direction: column;
                gap: 0.5rem;
                justify-content: center;
            font-weight: bolder;
            padding: 0.5rem 0;
            width: calc((100% - 2rem) / 6);
            .choice-emoji {
                font-size: 2rem;
                line-height: 1;
            }
            .choice-text {
                color: inherit;
                font-size: 0.675rem;
                font-weight: bold;
                line-height: 1rem;
                text-transform: uppercase;
            }
        }
    }
    .date-current {
        font-size: 0.875rem;
    }
}
</style>
