<script setup>
    import {
        emotionsBasic,
        emotionNothing,
    } from '@/constants';
    import { useShareModalStore } from '@/store/shareModal';
    import db from '@/singleton/database';
    import ShareEmotionList from '@/page/Share/ShareEmotionList.vue';
    import ShareModal from '@/page/Share/ShareModal/ShareModal.vue';

    const shareModalStore = useShareModalStore();

    const handleModalSave = () => {
        db.add({
            createdAt: (new Date()).toISOString(),
            emotion: shareModalStore.emotion.text,
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
        <ShareEmotionList/>
        <ShareModal v-if="shareModalStore.isVisible"
            @save="handleModalSave"
            @close="handleClose"
        />
    </div>
</template>

<style lang="scss">
.container-share {
    display: flex;
        flex-direction: column;
        justify-content: center;
    padding: 16vh 0;
    text-align: center;
    width: 100%;
    .share-prompt {
        font-size: 1.25rem;
    }
}
</style>
