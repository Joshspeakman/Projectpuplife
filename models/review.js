module.exports = function(Sequelize, DataTypes) {

  var Review = Sequelize.define("Review", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    review: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 300]
      }
    },

    reviewer: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    dog_id: {
      type: DataTypes.INTEGER,
      notEmpty: true
    }
  });

  // Review.associate = function(models) {
  //   models.Review.belongsTo(models.Dog, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Review;

};
