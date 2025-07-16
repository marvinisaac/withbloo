<script setup>
    import { transformToData } from '@/singleton/imageProcessor';
    import { useShareModalStore } from '@/store/shareModal';
    
    const shareModalStore = useShareModalStore();

    const imageSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            shareModalStore.image = await transformToData(file);
        }
    };
</script>

<template>
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

        <div v-if="shareModalStore.image" class="preview">
            <button @click="shareModalStore.image = null" type="button">
                Remove
            </button>
            <img :src="shareModalStore.image" alt="Upload Preview" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-image {
        button {
            background: var(--color-background-mute);
            border: none;
            border-radius: 0.5rem;
            color: var(--color-text);
            font-size: 1rem;
            font-weight: bolder;
            line-height: 1rem;
            padding: 0.5rem;
        }
        .preview {
            display: flex;
                align-items: flex-end;
                flex-direction: column;
                justify-content: center;
            position: relative;
            button {
                background: var(--color-background);
                position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
            }
            img {
                border-radius: 0.5rem;
                display: block;
                width: 100%;
            }
        }
    }
</style>
