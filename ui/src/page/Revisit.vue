<script setup>
    import { onMounted, ref } from 'vue';
    import {
        dateFormatDateOnly,
        dateFormatTimeOnly,
        emotionsBasic,
        emotionNothing
    } from '@/constants';
    import db from '@/singleton/database';
    import VueMarkdown from 'vue-markdown-render';

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
            journal: mood.journal,
            verb: emotionsBasic.find(e => e.text === mood.emotion)?.verb
                || emotionNothing.verb,
        }));
    });
</script>

<template>
    <div class="container-revisit">
        <div class="mood-entry"
            v-for="(mood, index) in all"
            :key="index"
        >
            <p class="date"
                v-if="mood.createdAtDate !== all[index - 1]?.createdAtDate"
            >
                {{ mood.createdAtDate }}
            </p>
            <div class="details">
                <div class="basic">
                    <div class="emoji">
                        <span>{{ mood.emoji }}</span>
                    </div>
                    <div class="date-text">
                        <span class="created-time">{{ mood.createdAtTime }}</span>
                        <span class="verb">{{ mood.verb }}</span>
                    </div>
                </div>
                <div class="expanded">
                    <div class="journal">
                        <VueMarkdown :source="mood.journal" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-revisit {
    display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
    padding-bottom: 12vh;
    width: 100%;
    .mood-entry {
        .date {
            font-size: 1.5rem;
            font-weight: bolder;
            line-height: 3;
            text-align: center;
        }
        .details {
            display: flex;
                flex-direction: column;
            margin: 0 auto;
            padding: 0 1rem;
            .basic {
                display: flex;
                    align-items: flex-start;
                .emoji {
                    width: 3rem;
                    span {
                        display: inline-block;
                        font-size: 2rem;
                        line-height: 1.5;
                        text-align: center;
                        width: 100%;
                    }
                }
                .date-text {
                    display: flex;
                        flex-direction: column;
                    width: calc(100% - 3rem);
                    .created-time {
                        font-size: 0.75rem;
                        line-height: 1;
                    }
                    .verb {
                        font-weight: bolder;
                        text-transform: uppercase;
                    }
                }
            }
            .expanded {
                padding-left: 3rem;
                .journal {
                    border: 1px solid var(--color-border);
                    border-radius: 0.25rem;
                    padding: 0.25rem 0.5rem;
                }
            }
        }
    }
}
</style>
