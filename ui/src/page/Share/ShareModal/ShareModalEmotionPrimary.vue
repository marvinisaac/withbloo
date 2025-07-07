<script setup>
    import { ref } from 'vue';
    import {
        emotionsBasic,
        emotionNothing,
    } from '@/constants';
    import { useShareModalStore } from '@/store/shareModal';
    import EmotionSingle from '@/component/EmotionSingle.vue';
    import ShareModalEmotionSecondary from '@/page/Share/ShareModal/ShareModalEmotionSecondary.vue';

    const shareModalStore = useShareModalStore();

    const handleOpenSecondaryEmotion = () => {
        shareModalStore.emotionSecondary.isVisible = true;
    }
</script>

<template>
    <div class="modal-emotion">
        <EmotionSingle :emotion="shareModalStore.emotion" />
        <button
            v-if="shareModalStore.emotion?.text !== emotionNothing.text"
            @click="handleOpenSecondaryEmotion"
            type="button"
        >
            ➕
        </button>
        <template v-if="shareModalStore.emotionSecondary.emotion">
            <EmotionSingle :emotion="shareModalStore.emotionSecondary.emotion" />
            <button type="button">🟰</button>
            <EmotionSingle :emotion="shareModalStore.emotionCombo" />
        </template>
        <ShareModalEmotionSecondary />
    </div>
</template>

<style lang="scss" scoped>
    .modal-emotion {
        display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
        button {
            background: var(--color-background);
            border: none;
        }
        .modal-emoji {
            font-size: 2rem;
        }
        .modal-text {
            font-weight: bolder;
            text-transform: capitalize;
        }
    }
</style>
