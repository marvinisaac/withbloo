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
    
    const imageFile = ref(null);
    const imagePreview = ref(null);
    const journal = ref('');

    watch(() => props.show, (val) => {
        if (!val) {
            return journal.value = '';
        }
    });

    const close = () => {
        emit('close');
        journal.value = '';
    }
    
    const imageDelete = () => {
        imagePreview.value = null;
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
                    imagePreview.value = canvas.toDataURL('image/webp', 0.8);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const save = () => {
        emit(
            'save',
            {
                emotion: props.emotion,
                image: imagePreview.value,
                journal: journal.value
            }
        );
        journal.value = '';
    }
</script>

<template>
    <div @click.self="close"
        class="modal-backdrop" 
    >
        <div class="modal-content">
            <span @click="close"
                class="modal-close"
            >
                Close
            </span>
            <div class="modal-emotion">
                <span class="modal-emoji">{{ emotion.emoji }}</span>
                <span class="modal-text">{{ emotion.text }}</span>
            </div>

            <div class="modal-journal">
                <textarea v-model="journal"
                    :name="`Why are you feeling ${emotion.verb}?`"
                    :placeholder="`Why are you feeling ${emotion.verb}?`"
                >
                </textarea>
            </div>
            
            <div class="modal-image">
                <button v-if="!imagePreview"
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

                <div v-if="imagePreview"
                    class="preview"
                >
                    <span @click="imageDelete"
                        class="preview-delete"
                    >
                        Delete
                    </span>
                    <img :src="imagePreview" alt="Upload Preview" />
                </div>
            </div>

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
            border-radius: 0 0.5rem;
            color: var(--color-heading);
            font-size: 0.75rem;
            line-height: 2;
            padding: 0 0.5rem;
            position: absolute;
                top: 0;
                right: 0;
            text-transform: uppercase;
        }
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
