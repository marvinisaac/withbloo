import Dexie from 'dexie';

const dexie = new Dexie('bloo');
dexie.version(1).stores({
    mood: '++id, createdAt',
});

const entry = {
    add: async (data) => {
        try {
            const duplicateCreatedAt = await dexie.mood.where('createdAt').equals(data.createdAt).first();
            if (duplicateCreatedAt) {
                return null;
            }

            const id = await dexie.mood.add(data);
            return id;
        } catch (error) {
            console.error('Error adding data:', error);
        }
    },
    getAll: async () => {
        try {
            return await dexie
                .mood
                .orderBy('createdAt')
                .reverse()
                .toArray();
        } catch (error) {
            console.error('Error getting all data:', error);
            return null;
        }
    },
    getRecent: async (limit = 10) => {
        try {
            return await dexie
                .mood
                .orderBy('createdAt')
                .reverse()
                .limit(limit)
                .toArray();
        } catch (error) {
            console.error('Error getting recent data:', error);
            return [];
        }
    },
};

const db = {
    entry,
};

export default db;
