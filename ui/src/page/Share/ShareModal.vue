<script setup>
    import {
        defineEmits,
        defineProps,
        ref,
        watch,
    } from 'vue';

    const emit = defineEmits(['close', 'save']);
    const props = defineProps({
        emotion: { type: Object, required: true },
        show: { type: Boolean, required: true },
    });
    const journal = ref('');

    watch(() => props.show, (val) => {
        if (!val) {
            return journal.value = '';
        }
    });

    const save = () => {
        emit('save', { emotion: props.emotion, journal: journal.value });
        journal.value = '';
    }

    const close = () => {
        emit('close');
        journal.value = '';
    }
</script>

<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal-content">
            <div class="modal-emotion">
                <span class="modal-emoji">{{ emotion.emoji }}</span>
                <span class="modal-text">{{ emotion.text }}</span>
            </div>
            <textarea v-model="journal"
                :placeholder="`Why are you feeling ${emotion.verb}?`"
            >
            </textarea>
            <div class="modal-actions">
                <button @click="save">Save</button>
                <button @click="close">Cancel</button>
            </div>
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
    z-index: 2000;
    .modal-content {
        background: var(--color-background);
        border-radius: 1rem;
        display: flex;
            flex-direction: column;
            gap: 1rem;
        padding: 1rem;
        width: 100%;
        .modal-emotion {
            display: flex;
                align-items: center;
                gap: 1rem;
                justify-content: center;
            .modal-emoji {
                font-size: 2rem;
            }
            .modal-text {
                text-transform: capitalize;
            }
        }
        textarea {
            border-radius: 0.5rem;
            font-family: inherit;
            min-height: 80px;
            padding: 0.5rem;
            resize: vertical;
            width: 100%;
        }
        .modal-actions {
            display: flex;
                gap: 1rem;
                justify-content: center;
            button {
                background: var(--color-background-mute);
                border: none;
                border-radius: 0.5rem;
                color: var(--color-text);
                cursor: pointer;
                font-weight: bolder;
                line-height: 3;
                padding: 0;
                text-align: center;
                width: 50%;
            }
        }
    }
}
</style>
