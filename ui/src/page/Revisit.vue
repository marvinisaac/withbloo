<script setup>
    import { onMounted, ref } from 'vue';
    import {
        dateFormatDateOnly,
        dateFormatTimeOnly,
        emotionsBasic,
        emotionNothing,
        getCombinedEmotions,
    } from '@/constants';
    import db from '@/singleton/database';
    import EmotionSingle from '@/component/shared/EmotionSingle.vue';
    import VueMarkdown from 'vue-markdown-render';

    const all = ref([]);
    
    const getEmotion = (mood) => {
        if (mood.emotion === emotionNothing.noun) {
            return emotionNothing;
        }
        
        const emotions = mood.emotion.split(' ');
        if (emotions.length === 2) {
            return getCombinedEmotions(emotions[0], emotions[1]);
        }

        return emotionsBasic.find(e => e.noun === mood.emotion);
    }

    onMounted(async () => {
        const moods = await db.entry.getRecent(999);

        all.value = moods.map(mood => ({
            createdAtDate: (new Date(mood.createdAt))
                .toLocaleString('en-US', dateFormatDateOnly)
                .replaceAll(',', ''),
            createdAtTime: (new Date(mood.createdAt))
                .toLocaleString('en-US', dateFormatTimeOnly)
                .replaceAll(',', ''),
            emotion: getEmotion(mood),
            image: mood.image,
            journal: mood.journal,
        }));
    });
</script>

<template>
    <div class="container-revisit">
        <div v-if="all.length < 1"
            class="mood-entry"
        >
            <p class="date">
                No entry yet
            </p>
        </div>
        <div v-else
            v-for="(mood, index) in all"
            :key="index"
            class="mood-entry"
        >
            <p class="date"
                v-if="mood.createdAtDate !== all[index - 1]?.createdAtDate"
            >
                {{ mood.createdAtDate }}
            </p>
            <div class="mood-entry-details-container">
                <EmotionSingle
                    :emotion="mood.emotion"
                    :isTextVisible="false"
                    class="emotion-single"
                />
                <div class="mood-entry-details">
                    <p class="time">{{ mood.createdAtTime }}</p>
                    <p class="emotion">{{ mood.emotion.noun }}</p>
                    <div v-if="mood.journal"
                        class="journal"
                    >
                        <VueMarkdown :source="mood.journal"
                            class="markdown"
                        />
                    </div>
                    <img v-if="mood.image"
                        :src="mood.image"
                        alt="Attached image to mood entry"
                        class="image"
                    />
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
        .mood-entry-details-container {
            display: flex;
                align-items: flex-start;
                gap: 1rem;
            margin: 0 auto;
            padding: 0 1rem;
            .emotion-single {
                flex-shrink: 0;
                width: 4rem;
            }
            .mood-entry-details {
                .time {
                    font-size: 0.75rem;
                    line-height: 1;
                }
                .emotion {
                    font-weight: bolder;
                    text-transform: uppercase;
                }
                .image {
                    border-radius: 0.25rem;
                    width: auto;
                        max-width: 100%;
                }
                .journal {
                    :deep(.markdown) {
                        line-height: 1.5;
                        p {
                            margin-bottom: 1rem;
                            &:last-of-type {
                                margin-bottom: 0;
                            }
                        }       
                    }
                }
            }
        }
    }
}
</style>
