<script setup>
    import { onMounted, ref } from 'vue';
    import { useShareModalStore } from '@/store/shareModal';
    import ActivityInput from '@/component/page/share/modal/ActivityInput.vue';
    import db from '@/singleton/database';

    const activities = ref([]);
    const shareModalStore = useShareModalStore();

    const handleClickActivity = async (activityId) => {
        if (!shareModalStore.activities.includes(activityId)) {
            shareModalStore.activities.push(activityId);
        } else {
            const index = shareModalStore.activities.indexOf(activityId);
            shareModalStore.activities.splice(index, 1);
        }
    }

    const handleGetActivities = async () => {
        activities.value = await db.activity.getAll();
    }

    onMounted(async () => {
        await handleGetActivities();
    });
</script>

<template>
    <div class="modal-activity">
        <p>What did you choose to do?</p>
        <div class="activities-container">
            <button @click="shareModalStore.isActivityInputVisible = true" type="button">
                +
            </button>
            <button
                v-for="(activity, index) in activities"
                @click="handleClickActivity(activity.id)"
                :class="{added: shareModalStore.activities.includes(activity.id)}"
                :key="index"
                type="button"
            >
                {{ activity.emoji }} {{ activity.name }}
            </button>
        </div>
        <ActivityInput @refresh="handleGetActivities" />
    </div>
</template>

<style lang="scss" scoped>
    .modal-activity {
        display: flex;
            flex-direction: column;
            gap: 0.5rem;
        padding: 0.5rem 0.5rem 0;
        p {
            text-align: left;
        }
        .activities-container {
            display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            button {
                background: transparent;
                border: 1px solid var(--color-border);
                border-radius: 0.25rem;
                color: var(--color-text);
                font-size: 1rem;
                line-height: 1.5;
                padding: 0.25rem 0.5rem;
                text-transform: capitalize;
                &.added,
                &:first-of-type {
                    border-color: var(--bloo);
                    color: var(--bloo);
                    font-weight: bolder;
                }
            }
        }
    }
</style>
