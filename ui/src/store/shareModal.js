import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getCombinedEmotions } from '@/constants';

export const useShareModalStore = defineStore('shareModal', () => {
    const emotion = ref(null);
    const emotionSecondary = {
        emotion: ref(null),
        isVisible: ref(false),
    };
    const image = ref(null);
    const isVisible = ref(false);
    const journal = ref('');

    function _reset() {
        emotion.value = null;
        image.value = null;
        isVisible.value = false;
        journal.value = '';
        emotionSecondary.emotion.value = null;
        emotionSecondary.isVisible.value = false;
    }

    const emotionCombo = computed(() => {
        return getCombinedEmotions(
            emotion.value?.text,
            emotionSecondary.emotion?.value?.text
        );
    });

    function handleClose() {
        _reset();
    }

    function handleOpen(selectedEmotion) {
        emotion.value = selectedEmotion;
        isVisible.value = true;
    }

    return {
        // Variables
        emotion,
        emotionCombo,
        emotionSecondary,
        image,
        isVisible,
        journal,
        // Functions
        handleClose,
        handleOpen,
    };
});
