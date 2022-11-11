const { Sequelize } = require('sequelize');

const establish = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');
        await sequelize.sync();
        console.log('Models synchronization finished.');
    } catch (e) {
        console.error(e);
    }
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        define: { timestamps: false }
    }
);

establish();

module.exports = sequelize;