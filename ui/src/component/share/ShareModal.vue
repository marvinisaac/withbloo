<script setup>
    import { defineEmits } from 'vue';
    import { useShareModalStore } from '@/store/shareModal';
    import ShareModalEmotionPrimary from '@/component/share/modal/ShareModalEmotionPrimary.vue';
    import ShareModalImage from '@/component/share/modal/ShareModalImage.vue';
    import ShareModalJournal from '@/component/share/modal/ShareModalJournal.vue';

    const emit = defineEmits(['save']);
    const shareModalStore = useShareModalStore();

    const save = () => {
        emit('save');
    }
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal-content">
            <div class="modal-control">
                <button @click="shareModalStore.handleClose" type="button">
                    Close
                </button>
                <button @click="save" type="button">
                    Save
                </button>
            </div>
            <ShareModalEmotionPrimary />
            <ShareModalJournal />
            <ShareModalImage />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-backdrop {
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
            flex-direction: column;
            justify-content: center;
        padding: 1rem;
        position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
        z-index: 2000;
        .modal-content {
            background: var(--color-background);
            border: 1px solid var(--color-border);
            border-radius: 0.5rem;
            display: flex;
                flex-direction: column;
                gap: 1rem;
            height: 100%;
            overflow-y: scroll;
            padding: 0 1rem 3rem;
            position: relative;
            width: 100%;
            .modal-control {
                background: var(--color-background);
                display: flex;
                    justify-content: space-between;
                margin-bottom: -1rem;
                position: sticky;
                    top: 0;
                width: 100%;
                z-index: 1; // Fix for combined emotion showing on top of modal-control
                button {
                    background: none;
                    border: none;
                    color: var(--color-text);
                    line-height: 3rem;
                    font-size: 1rem;
                    font-weight: bolder;
                    padding: 0;
                    &:last-of-type {
                        color: var(--bloo);
                    }
                }
            }
        }
    }
</style>
