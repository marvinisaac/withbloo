<script setup>
    import {
        emotionsBasic,
        emotionNothing,
    } from '@/constants';
    import { ref } from 'vue';
    import db from '@/singleton/database';
    import ShareModal from './ShareModal.vue';

    const showModal = ref(false);
    const selectedEmotion = ref(null);

    const handleShare = (emotion) => {
        selectedEmotion.value = emotion;
        showModal.value = true;
    };

    const handleModalClose = () => {
        selectedEmotion.value = null;
        showModal.value = false;
    };

    const handleModalSave = ({ emotion, journal }) => {
        db.add({
            createdAt: (new Date()).toISOString(),
            emotion: emotion.text,
            journal: journal,
        });
        selectedEmotion.value = null;
        showModal.value = false;
    };
</script>

<template>
    <div class="container-share">
        <p class="share-prompt">
            What are you feeling right now?
        </p>
        <div class="share-choices">
            <div class="choice-emotions">
                <div class="choice"
                    @click="handleShare(emotion)"
                    v-for="(emotion, index) in emotionsBasic"
                    :key="index"
                >
                    <span class="choice-emoji"> {{ emotion.emoji }} </span>
                    <span class="choice-text"> {{ emotion.text }} </span>
                </div>
            </div>
            <div class="choice-nothing"
                @click="handleShare(emotionNothing)"
            >
                <span class="choice-emoji"> {{ emotionNothing.emoji }} </span>
                <span class="choice-text"> {{ emotionNothing.text }} </span>
            </div>
        </div>
        <ShareModal v-if="showModal && selectedEmotion"
            :show="showModal"
            :emotion="selectedEmotion"
            @save="handleModalSave"
            @close="handleModalClose"
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
    .share-choices {
        display: flex;
            flex-direction: column;
            gap: 1rem;
        margin-top: 2rem;
        .choice-emotions {
            display: flex;
                gap: 0.25rem;
                justify-content: center;
            .choice {
                cursor: pointer;
                display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    justify-content: center;
                font-weight: bolder;
                padding: 0.5rem 0;
                width: calc((100% - 2rem) / 6);
                .choice-emoji {
                    font-size: 2rem;
                    line-height: 1;
                }
                .choice-text {
                    color: inherit;
                    font-size: 0.675rem;
                    font-weight: bold;
                    line-height: 1rem;
                    text-transform: uppercase;
                }
            }
        }
        .choice-nothing {
            cursor: pointer;
            display: flex;
                align-items: center;
                justify-content: center;
            margin: 0 auto;
            padding: 0.5rem;
            width: auto;
            .choice-emoji {
                font-size: 1rem;
                line-height: 0.875;
            }
            .choice-text {
                font-size: 0.675rem;
                font-weight: bold;
                line-height: 1rem;
                text-transform: uppercase;
            }
        }
    }
}
</style>
