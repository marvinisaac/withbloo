<script setup>
    import {
        emotionsBasic,
        emotionNothing,
    } from '@/constants';
    import { useShareModalStore } from '@/store/shareModal';
    import EmotionSingle from '@/component/shared/EmotionSingle.vue';

    const shareModalStore = useShareModalStore();
    const emotionsBasicShuffled = emotionsBasic
        .filter(emotion => emotion.noun !== shareModalStore.emotion?.noun)
        .sort(() => Math.random() - 0.5);

    const handleShare = (emotion) => {
        if (shareModalStore.isSecondaryVisible) {
            shareModalStore.emotionSecondary = emotion;
            return;
        }

        shareModalStore.handleOpen(emotion);
        return;
    };
</script>

<template>
    <div class="share-choices">
        <div class="choice-emotions">
            <EmotionSingle
                @click="handleShare(emotion)"
                v-for="(emotion, index) in (emotionsBasicShuffled)"
                :emotion="emotion"
                :key="index"
            />
            <EmotionSingle
                v-if="!shareModalStore.isSecondaryVisible"
                @click="handleShare(emotionNothing)"
                :emotion="emotionNothing"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .share-choices {
        display: flex;
            flex-direction: column;
            gap: 1rem;
        .choice-emotions {
            display: flex;
                flex-wrap: wrap;
                gap: 1rem 0.25rem;
                justify-content: center;
            :deep(.emotion-single) {
                width: calc(80% / 3);
            }
        }
    }
</style>
