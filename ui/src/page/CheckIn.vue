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
        <p class="date-current">
            {{ formattedDate }}
        </p>
        <p class="check-in-prompt">
            What are you feeling right now?
        </p>
        <div class="check-in-choices">
            <div class="choice-emotions">
                <div class="choice"
                    v-for="(emotion, index) in emotionsBasic"
                    :key="index"
                >
                    <span class="choice-emoji"> {{ emotion.emoji }} </span>
                    <span class="choice-text"> {{ emotion.text }} </span>
                </div>
            </div>
            <div class="choice-nothing">
                <span class="choice-emoji"> 🤔 </span>
                <span class="choice-text"> Not sure </span>
            </div>
        </div>
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
    .date-current {
        font-size: 0.875rem;
    }
    .check-in-prompt {
        font-size: 1.25rem;
    }
    .check-in-choices {
        display: flex;
            flex-direction: column;
            gap: 1rem;
        margin-top: 2rem;
        .choice-emotions {
            display: flex;
                gap: 0.25rem;
                justify-content: center;
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
        .choice-nothing {
            cursor: pointer;
            display: flex;
                align-items: center;
                justify-content: center;
            margin: 0 auto;
            padding: 0.5rem;
            width: auto;
            .choice-emoji {
                font-size: 1rem;
                line-height: 0.875;
            }
            .choice-text {
                font-size: 0.675rem;
                font-weight: bold;
                line-height: 1rem;
                text-transform: uppercase;
            }
        }
    }
}
</style>
