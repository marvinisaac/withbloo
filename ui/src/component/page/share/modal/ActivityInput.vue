<script setup>
    import { defineEmits, ref } from 'vue';
    import { useShareModalStore } from '@/store/shareModal';
    import db from '@/singleton/database';

    const emit = defineEmits(['refresh']);
    const emoji = ref('');
    const name = ref('');
    const shareModalStore = useShareModalStore();

    const handleSave = async () => {
        await db.activity.add({
            emoji: emoji.value,
            name: name.value.toLowerCase(),
        });
        shareModalStore.isActivityInputVisible = false;
        emit('refresh');
        emoji.value = '';
        name.value = '';
    }

    const handleEmojiInput = () => {
        const emojiRegex = /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;

        if (emoji.value.length > 2) {
            emoji.value = emoji.value.slice(0, 2);
        }

        if (!emojiRegex.test(emoji.value)) {
            emoji.value = '';
        }
    }
</script>

<template>
    <div v-if="shareModalStore.isActivityInputVisible"
        @click.self="shareModalStore.isActivityInputVisible = false"
        class="modal-backdrop" 
    >
        <div class="modal-content">
            <p>Add a New Activity</p>
            <input
                @input="handleEmojiInput"
                v-model="emoji"
                class="emoji"
                name="emoji"
                placeholder="🤔"
                type="text"
            >
            <input
                v-model="name"
                class="name"
                name="name"
                placeholder="Activity Name"
                type="text"
            >
            <button @click="handleSave" type="button">Save</button>
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
                flex-wrap: wrap;
                gap: 1rem;
            height: auto;
                max-height: 90vh;
            overflow-y: scroll;
            padding: 1rem;
            position: relative;
            width: 100%;
                max-width: 720px;
            input {
                border: none;
                border-radius: 0.5rem;
                display: block;
                flex: 1 none none;
                font-family: inherit;
                font-size: inherit;
                padding: 0.5rem;
                &.name {                
                    width: calc(100% - 3rem - 0.5rem);
                }
                &.emoji {
                    width: calc(3rem - 0.5rem);
                    text-align: center;
                }
            }
            button,
            p {
                flex-grow: 1;
                width: 100%;
            }
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
</style>
