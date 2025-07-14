<script setup>
    import { useShareModalStore } from '@/store/shareModal';
    
    const shareModalStore = useShareModalStore();

    const getEmotionVerb = () => {
        return shareModalStore.emotionCombination?.verb
            || shareModalStore.emotion.verb;
    }
</script>

<template>
    <div class="modal-journal">
        <textarea v-model="shareModalStore.journal"
            :name="`Why are you feeling ${getEmotionVerb()}?`"
            :placeholder="`Why are you feeling ${getEmotionVerb()}?`"
        >
        </textarea>
    </div>
</template>

<style lang="scss" scoped>
    .modal-journal {
        textarea {
            border-radius: 0.5rem;
            display: block;
            font-family: inherit;
            font-size: inherit;
            min-height: 8rem;
            padding: 0.5rem;
            resize: none;
            width: 100%;
        }
    }
</style>
