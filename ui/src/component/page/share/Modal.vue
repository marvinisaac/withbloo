<script setup>
    import { defineEmits } from 'vue';
    import { useShareModalStore } from '@/store/shareModal';
    import Activity from '@/component/page/share/modal/Activity.vue';
    import EmotionPrimary from '@/component/page/share/modal/EmotionPrimary.vue';
    import Image from '@/component/page/share/modal/Image.vue';
    import Journal from '@/component/page/share/modal/Journal.vue';

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
            <EmotionPrimary />
            <Activity />
            <Journal />
            <Image />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-backdrop {
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
            align-items: center;
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
            overflow-y: auto;
            padding: 0 1rem 3rem;
            position: relative;
            width: 100%;
                max-width: 720px;
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
