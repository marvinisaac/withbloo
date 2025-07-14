<script setup>
    import { defineProps } from 'vue';
    import { emotionNothing } from '@/constants';

    const props = defineProps({
        emotion: Object,
        isTextVisible: {
            default: true,
            type: Boolean,
        }
    });
</script>

<template>
    <div class="emotion-single">
        <div v-if="props.emotion?.sources"
            class="emotion-combination"
        >
            <div class="emotion-combination-first">
                <img
                    :alt="`${props.emotion.sources[0].noun}`"
                    :src="`/images/${props.emotion.sources[0].noun}.jpg`"
                />
            </div>
            <img
                :alt="`${props.emotion.sources[1].noun}`"
                :src="`/images/${props.emotion.sources[1].noun}.jpg`"
            />
        </div>
        <img v-else
            :class="{'unsure': props.emotion.noun === emotionNothing.noun}"
            :alt="`${props.emotion.noun}`"
            :src="`/images/${props.emotion.noun}.jpg`"
        />
        <span v-if="props.isTextVisible" class="noun">
            {{ props.emotion.noun }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .emotion-single {
        cursor: pointer;
        display: flex;
            align-items: center;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: center;
        font-weight: bolder;
        img {
            border-radius: 0.25rem;
            display: block;
            height: auto;
                max-height: 5rem;
            margin: 0 auto;
            width: 100%;
                max-width: 5rem;
            &.unsure {
                filter: grayscale(100%);
            }
        }
        .emotion-combination {
            border-radius: 0.25rem;
            height: auto;
                max-height: 5rem;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            width: 100%;
                max-width: 5rem;
            .emotion-combination-first {
                height: 100%;
                overflow: hidden;
                position: absolute;
                    left: 0;
                    top: 0;
                width: 50%;
                img {
                    width: 200%;
                }
            }
            img {
                border-radius: 0;
                height: 100%;
                width: 100%;
            }
        }
        .noun {
            color: inherit;
            font-size: 0.675rem;
            font-weight: bold;
            line-height: 1;
            text-transform: uppercase;
        }
    }
</style>
