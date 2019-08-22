module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      additionalNotes: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    })
    return Contact;
  }