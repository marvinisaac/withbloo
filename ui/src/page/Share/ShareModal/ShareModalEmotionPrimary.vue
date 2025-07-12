<script setup>
    import { emotionNothing } from '@/constants';
    import { useShareModalStore } from '@/store/shareModal';
    import EmotionSingle from '@/component/EmotionSingle.vue';
    import ShareModalEmotionSecondary from '@/page/Share/ShareModal/ShareModalEmotionSecondary.vue';

    const shareModalStore = useShareModalStore();

    const handleOpenSecondaryEmotion = () => {
        shareModalStore.isSecondaryVisible = true;
    }
</script>

<template>
    <div class="modal-emotion">
        <EmotionSingle :emotion="shareModalStore.emotion" />
        <span
            v-if="shareModalStore.emotion?.noun !== emotionNothing.noun"
            @click="handleOpenSecondaryEmotion"
            class="emotion-add"
        >
            +
        </span>
        <template v-if="shareModalStore.emotionSecondary">
            <EmotionSingle :emotion="shareModalStore.emotionSecondary" />
            <span>=</span>
            <EmotionSingle :emotion="shareModalStore.emotionCombination" />
        </template>
        <ShareModalEmotionSecondary />
    </div>
</template>

<style lang="scss" scoped>
    .modal-emotion {
        display: flex;
            align-items: center;
            justify-content: center;
        span {
            color: var(--color-text);
            display: flex;
                justify-content: center;
            font-size: 2rem;
            font-weight: bolder;
            line-height: 1;
            width: 2rem;
        }
        .emotion-add {
            background: var(--color-background);
            border: none;
            padding: 0;
        }
        .emotion-single {
            flex-shrink: 0;
            width: auto;
                max-width: calc((100% - 4rem) / 3);
        }
    }
</style>
