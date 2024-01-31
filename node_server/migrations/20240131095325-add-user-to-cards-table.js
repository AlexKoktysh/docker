module.exports = {
    async up(db, client) {
        await db.collection("card").updateMany(
            {},
            {
                $set: {
                    assignedUser: "",
                },
            },
            { multi: true },
        );
    },

    async down(db, client) {
        await db
            .collection("card")
            .updateMany(
                {},
                { $unset: { assignedUser: null } },
                { multi: true },
            );
    },
};
