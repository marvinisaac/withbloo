import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getCombinedEmotions } from '@/constants';

export const useShareModalStore = defineStore('shareModal', () => {
    const emotion = ref(null);
    const emotionSecondary = ref(null);
    const image = ref(null);
    const isPrimaryVisible = ref(false);
    const isSecondaryVisible = ref(false);
    const journal = ref('');

    function _reset() {
        emotion.value = null;
        image.value = null;
        isPrimaryVisible.value = false;
        isSecondaryVisible.value = false;
        journal.value = '';
        emotionSecondary.value = null;
    }

    const emotionCombo = computed(() => {
        return getCombinedEmotions(
            emotion.value?.noun,
            emotionSecondary.value?.noun
        );
    });

    function handleClose() {
        _reset();
    }

    function handleOpen(selectedEmotion) {
        emotion.value = selectedEmotion;
        isPrimaryVisible.value = true;
    }

    return {
        // Variables
        emotion,
        emotionCombo,
        emotionSecondary,
        image,
        isPrimaryVisible,
        isSecondaryVisible,
        journal,
        // Functions
        handleClose,
        handleOpen,
    };
});
