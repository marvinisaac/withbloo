<script setup>
    import { defineEmits, ref } from 'vue';
    import { useShareModalStore } from '@/store/shareModal';
    import ShareModalEmotionPrimary from '@/page/Share/ShareModal/ShareModalEmotionPrimary.vue';

    const emit = defineEmits(['save']);
    const imageFile = ref(null);
    const shareModalStore = useShareModalStore();

    const getEmotionVerb = () => {
        return shareModalStore.emotionCombination?.verb
            || shareModalStore.emotion.verb;
    }

    const imageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            imageFile.value = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const maxDimension = 720;
                    let { width, height } = img;

                    if (width > maxDimension || height > maxDimension) {
                        const widthRatio = maxDimension / width;
                        const heightRatio = maxDimension / height;
                        const ratio = Math.min(widthRatio, heightRatio);
                        width = Math.round(width * ratio);
                        height = Math.round(height * ratio);
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    shareModalStore.image = canvas.toDataURL('image/webp', 0.8);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const save = () => {
        emit('save');
    }
</script>

<template>
    <div @click.self="shareModalStore.handleClose"
        class="modal-backdrop" 
    >
        <div class="modal-content">
            <span @click="shareModalStore.handleClose"
                class="modal-close"
            >
                Close
            </span>

            <ShareModalEmotionPrimary />

            <div class="modal-journal">
                <textarea v-model="shareModalStore.journal"
                    :name="`Why are you feeling ${getEmotionVerb()}?`"
                    :placeholder="`Why are you feeling ${getEmotionVerb()}?`"
                >
                </textarea>
            </div>
            
            <div class="modal-image">
                <button v-if="!shareModalStore.image"
                    @click="$refs.cameraInput.click()"
                    type="button"
                >
                    Add Picture
                </button>
                <input @change="imageSelect"
                    accept="image/*"
                    ref="cameraInput"
                    style="display: none"
                    type="file"
                />

                <div v-if="shareModalStore.image"
                    class="preview"
                >
                    <span @click="shareModalStore.image = null"
                        class="preview-delete"
                    >
                        Delete
                    </span>
                    <img :src="shareModalStore.image" alt="Upload Preview" />
                </div>
            </div>

            <div class="modal-actions">
                <button @click="save">Save</button>
                <button @click="shareModalStore.handleClose">Cancel</button>
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
            border-radius: 0.5rem;
            display: flex;
                flex-direction: column;
                gap: 1rem;
            height: auto;
                max-height: 90vh;
            overflow-y: scroll;
            padding: 1rem;
            position: relative;
            width: 100%;
            button {
                background: var(--color-background-mute);
                border: none;
                border-radius: 0.5rem;
                color: var(--color-text);
                cursor: pointer;
                font-size: inherit;
                font-weight: bolder;
                line-height: 2;
                padding: 0;
                text-align: center;
                width: 50%;
            }
            .modal-close,
            .preview-delete {
                background: red;
                border-radius: 0 0.5rem 0 0;
                color: var(--color-heading);
                font-size: 0.75rem;
                line-height: 2;
                padding: 0 0.5rem;
                position: absolute;
                    top: 0;
                    right: 0;
                text-transform: uppercase;
            }
            .modal-journal {
                textarea {
                    border-radius: 0.5rem;
                    display: block;
                    font-family: inherit;
                    font-size: inherit;
                    min-height: 80px;
                    padding: 0.5rem;
                    resize: vertical;
                    width: 100%;
                }
            }
            .modal-image {
                .preview {
                    position: relative;
                    img {
                        border-radius: 0.5rem;
                        width: 100%;
                    }
                }
            }
            .modal-actions {
                display: flex;
                    gap: 1rem;
                    justify-content: center;
                margin-top: 2rem;
                button {
                    line-height: 3;
                    &:first-of-type {
                        background: var(--bloo);
                        color: var(--color-heading);
                    }
                    &:last-of-type {
                        background: var(--color-background);
                    }
                }
            }
        }
    }
</style>
