import Dexie from 'dexie';

const dexie = new Dexie('bloo');
dexie.version(1).stores({
    mood: '++id, createAt',
});

const db = {
    add: async (data) => {
        try {
            const id = await dexie.mood.add(data);
            return id;
        } catch (error) {
            console.error('Error adding data:', error);
        }
    },
    get: async (id) => {
        try {
            if (!id) {
                return await dexie.mood.toArray();
            }

            return await dexie.mood.get(id);
        } catch (error) {
            console.error('Error getting data:', error);
            return null;
        }
    },
};

export default db;
