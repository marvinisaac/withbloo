<script setup>
    import { useShareModalStore } from '@/store/shareModal';
    import ShareEmotionList from '@/component/page/share/EmotionList.vue';

    const shareModalStore = useShareModalStore();
</script>

<template>
    <div v-if="shareModalStore.isSecondaryVisible"
        @click="shareModalStore.isSecondaryVisible = false"
        class="modal-backdrop" 
    >
        <div class="modal-content">
            <p>What is it mixed with?</p>
            <ShareEmotionList />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-backdrop {
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
            align-items: center;
            justify-content: center;
        padding: 1rem;
        position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
        z-index: 3000;
        .modal-content {
            background: var(--color-background);
            border: 1px solid var(--color-border);
            border-radius: 0.5rem;
            display: flex;
                flex-direction: column;
                gap: 1rem;
            height: auto;
                max-height: 90vh;
            overflow-y: auto;
            padding: 1rem;
            position: relative;
            width: 100%;
                max-width: 720px;
        }
    }
</style>
