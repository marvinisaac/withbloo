<script setup>
    import {
        emotionsBasic,
        emotionNothing,
    } from '@/constants';
    import { useShareModalStore } from '@/store/shareModal';

    const shareModalStore = useShareModalStore();
</script>

<template>
    <div class="modal-emotion">
        <span class="modal-emoji">{{ shareModalStore.emotion.emoji }}</span>
        <span class="modal-text">{{ shareModalStore.emotion.text }}</span>
        <select>
            <option v-for="(em, index) in emotionsBasic"
                :key="index"
                :value="em.text"
            >
                {{ em.emoji }} {{ em.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    .modal-emotion {
        display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
        .modal-emoji {
            font-size: 2rem;
        }
        .modal-text {
            font-weight: bolder;
            text-transform: capitalize;
        }
    }
</style>
