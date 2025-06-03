<script setup>
    import { onMounted, ref } from 'vue';
    import {
        dateFormatDateOnly,
        dateFormatTimeOnly,
        emotionsBasic,
        emotionNothing
    } from '@/constants';
    import db from '@/singleton/database';

    const all = ref([]);

    onMounted(async () => {
        const moods = await db.getRecent(999);
        all.value = moods.map(mood => ({
            createdAtDate: (new Date(mood.createdAt))
                .toLocaleString('en-US', dateFormatDateOnly)
                .replaceAll(',', ''),
            createdAtTime: (new Date(mood.createdAt))
                .toLocaleString('en-US', dateFormatTimeOnly)
                .replaceAll(',', ''),
            emoji: emotionsBasic.find(e => e.text === mood.emotion)?.emoji
                || emotionNothing.emoji,
            emotion: mood.emotion,
        }));
    });
</script>

<template>
    <div class="container-revisit">
        <div class="revisit-date"
            v-for="(mood, index) in all"
            :key="index"
        >
            <p class="mood-date"
                v-if="mood.createdAtDate !== all[index - 1]?.createdAtDate"
            >
                {{ mood.createdAtDate }}
            </p>
            <div class="mood-details">
                <span class="mood-time">
                    {{ mood.createdAtTime }}
                </span>
                <span class="mood-emoji">
                    {{ mood.emoji }}
                </span>
                <span class="mood-emotion">
                    {{ mood.emotion }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-revisit {
    display: flex;
        flex-direction: column;
        justify-content: center;
    padding-bottom: 12vh;
    width: 100%;
    .revisit-date {
        .mood-date {
            font-size: 1.5rem;
            font-weight: bolder;
            line-height: 3;
            text-align: center;
        }
        .mood-details {
            display: flex;
                align-items: center;
                gap: 1rem;
            margin: 0 auto;
            width: 75%;
            .mood-time {
                font-size: 0.75rem;
                text-align: right;
                width: 5rem;
            }
            .mood-emoji {
                font-size: 2rem;
                text-align: center;
                width: 3rem;
            }
            .mood-emotion {
                flex-grow: 1;
                font-weight: bolder;
                text-align: left;
                text-transform: capitalize;
            }
        }
    }
}
</style>
