import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShareModalStore = defineStore('shareModal', () => {
    const emotion = ref(null);
    const image = ref(null);
    const isVisible = ref(false);
    const journal = ref('');

    function _reset() {
        emotion.value = null;
        image.value = null;
        isVisible.value = false;
        journal.value = '';
    }

    function handleClose() {
        _reset();
    }

    function handleOpen(selectedEmotion) {
        emotion.value = selectedEmotion;
        isVisible.value = true;
    }

    return {
        emotion,
        image,
        isVisible,
        handleClose,
        handleOpen,
    };
});
