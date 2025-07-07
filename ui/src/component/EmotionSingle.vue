<script setup>
    import { defineProps } from 'vue';

    const props = defineProps(['emotion']);
</script>

<template>
    <div class="emotion-single">
        <span class="emoji"> {{ props.emotion.emoji }} </span>
        <span class="text"> {{ props.emotion.text }} </span>
    </div>
</template>

<style lang="scss" scoped>
    .emotion-single {
        cursor: pointer;
        display: flex;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: center;
        font-weight: bolder;
        padding: 0.5rem 0;
        .emoji {
            font-size: 2rem;
            line-height: 1;
        }
        .text {
            color: inherit;
            font-size: 0.675rem;
            font-weight: bold;
            line-height: 1;
            text-transform: uppercase;
        }
    }
</style>
