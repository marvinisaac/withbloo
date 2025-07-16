<script setup>
    import {
        emotionsBasic,
        emotionNothing,
    } from '@/constants';
    import { useShareModalStore } from '@/store/shareModal';
    import db from '@/singleton/database';
    import EmotionList from '@/component/page/share/EmotionList.vue';
    import ShareModal from '@/component/page/share/Modal.vue';

    const shareModalStore = useShareModalStore();

    const handleModalSave = () => {
        const getEmotion = () => {
            if (!shareModalStore.emotionSecondary) {
                return shareModalStore.emotion.noun;
            }
            return `${shareModalStore.emotion.noun} ${shareModalStore.emotionSecondary.noun}`;
        }
        db.entry.add({
            createdAt: (new Date()).toISOString(),
            emotion: getEmotion(),
            image: shareModalStore.image,
            journal: shareModalStore.journal,
        });
        shareModalStore.handleClose();
    };
</script>

<template>
    <div class="container-share">
        <p class="share-prompt">
            What are you feeling right now?
        </p>
        <EmotionList/>
        <ShareModal v-if="shareModalStore.isPrimaryVisible"
            @save="handleModalSave"
        />
    </div>
</template>

<style lang="scss">
.container-share {
    display: flex;
        flex-direction: column;
        justify-content: center;
    text-align: center;
    width: 100%;
    .share-prompt {
        font-size: 1.25rem;
    }
}
</style>
